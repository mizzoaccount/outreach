"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Edit } from "lucide-react";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileInfoSection } from "@/components/profile/ProfileInfoSection";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { AdminTable } from "@/components/profile/AdminTable";
import { ProductModal } from "@/components/profile/ProductModal";
import useProducts from "@/utils/useProducts";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { DevotionModal } from "@/components/profile/DevotionModal";
import { SermonModal } from "@/components/profile/SermonModal";
import { EventModal } from "@/components/profile/EventModal";
import { GalleryModal } from "@/components/profile/GalleryModal";

interface Product {
  _id: string;
  name: string;
  designer: string;
  category: {
    main: string;
    sub: string;
    brand: string;
  };
  price: number;
  stock: number;
  images: string[];
  attributes: Record<string, string>;
  createdAt: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: Array<{
    id: number;
    name: string;
    designer: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  total: number;
  trackingNumber: string;
}

interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
  orderCount?: number;
}

interface ApiResponse {
  success: boolean;
  count: number;
  total: number;
  pages: number;
  currentPage: number;
  data: AdminUser[];
}

const ProfilePage = () => {
  const { user, isLoading, token , logout, refreshUser} = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDevotionModalOpen, setIsDevotionModalOpen] = useState(false);
  const [isSermonModalOpen, setIsSermonModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const router = useRouter();
  
  // Initialize form data with user info or empty strings
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
  });

  const { products, loading, error } = useProducts();

  useEffect(() => {
    if (!user && !isLoading) {
      // Redirect to login page if no user is found and not loading
      router.push('/auth/login');
    }

    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingZip: "",
        shippingCountry: "",
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingZip: "",
        billingCountry: "",
      });

      // Load orders when user is available and orders tab is active
      if (activeTab === "orders" && user) {
        loadOrders();
      }

      // Load users when admin tab is active and user is admin
      if (activeTab === "users" && user?.role === "admin") {
        loadUsers();
      }
    }
  }, [user, activeTab]);

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      // Replace with actual API call to fetch user orders
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${user._id}`);
      // const data = await response.json();
      // setOrders(data);
      
      // Temporary mock data until API is implemented
      setOrders([]);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

 const loadUsers = async (page = 1, limit = 10, search = '') => {
  setIsLoadingUsers(true);
  console.log('🔄 Starting loadUsers...');
  console.log('👉 Page:', page, '| Limit:', limit, '| Search:', search);
  console.log('🔑 Token:', token);

  try {
    // First check if we have a token
    if (!token) {
      console.warn('⛔ No authentication token available. Aborting.');
      throw new Error('No authentication token available');
    }

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${search}`;
    }

    console.log('🌐 Fetching users from:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('🔁 Token might be expired. Attempting to refresh user...');
        await refreshUser(); // refresh token or re-authenticate
        console.log('🔄 Retrying loadUsers after refresh...');
        return loadUsers(page, limit, search); // retry once
      }
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    console.log('✅ Users data received:', data);

    if (data.success) {
      setAdminUsers(data.data);
      setPagination({
        page: data.currentPage,
        limit,
        total: data.total,
        pages: data.pages
      });
    } else {
      console.warn('⚠️ API responded with success: false');
    }

  } catch (error) {
    console.error("❌ Error loading users:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string" &&
      ((error as { message: string }).message.includes('401') ||
        (error as { message: string }).message.includes('Unauthorized'))
    ) {
      console.log('🚪 Logging out due to auth error...');
      logout();
      router.push('/login');
    }

  } finally {
    setIsLoadingUsers(false);
    console.log('✅ loadUsers complete');
  }
};


  const handlePageChange = (newPage: number) => {
    loadUsers(newPage, pagination.limit);
  };

  const handleSearch = (searchTerm: string) => {
    loadUsers(1, pagination.limit, searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with actual API call to update user profile
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const updatedUser = await response.json();
      // setUser(updatedUser);
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditProduct = (productId: string) => {
    console.log("Editing product:", productId);
    // Implement edit functionality here
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh products after deletion
      const { products } = await response.json();
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditUser = (userId: string) => {
    console.log("Editing user:", userId);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Refresh user list after deletion
      loadUsers(pagination.page, pagination.limit);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleStartShopping = () => {
    router.push("/collections");
  };

  const handleEditAvatar = () => {
    console.log("Edit avatar clicked");
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  const handleAddProduct = () => {
    setIsProductModalOpen(true);
  };

  const handleProductAdded = (newProduct: any) => {
    console.log("New product added:", newProduct);
  };

  const handleDevotionAdded = (newDevotion: any) => {
    console.log("New devotion added:", newDevotion);
  };

  
  const handleSermonAdded = (newDevotion: any) => {
    console.log("New devotion added:", newDevotion);
  };

    const handleEventAdded = (newDevotion: any) => {
    console.log("New devotion added:", newDevotion);
  };

      const handleGalleryItemAdded = () => {
    setIsGalleryModalOpen(true);
  };

  const handleAddDevotion = () => {
    setIsDevotionModalOpen(true);
  };

  const handleEditDevotion= () => {
    console.log("New devotion added:");
  };

    const handleDeleteDevotion = async (devotionId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/devotions/${devotionId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh products after deletion
      const { products } = await response.json();
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

      const handleEditEvent = () => {
    setIsProductModalOpen(true);
  };

  const handleAddEvent = () => {
      setIsEventModalOpen(true);
  };

  
    const handleDeleteEvent = async (devotionId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/devotions/${devotionId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh products after deletion
      const { products } = await response.json();
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  // Format products for the AdminTable
  const formattedProducts = products.map((product: Product) => ({
    id: product._id,
    name: product.name,
    designer: product.designer,
    category: `${product.category.main}`,
    price: product.price,
    stock: product.stock,
    rawData: product,
  }));

  // Format admin users for the AdminTable
  const formattedUsers = adminUsers.map((user) => ({
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    joined: new Date(user.createdAt).toLocaleDateString(),
    orders: user.orderCount || 0,
    rawData: user,
  }));



  
    const handleDeleteGalleryItem = async (devotionId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/devotions/${devotionId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh products after deletion
      const { products } = await response.json();
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

          const handleEditGalleryItem = () => {
  console.log("New gallery item edited:");
  };

  const handleAddGalleryItem = () => {
        setIsGalleryModalOpen(true);
  };

    const handleEditSermon = () => {
  console.log("New sermon edited:");
  };

  const handleAddSermon = () => {
    setIsSermonModalOpen(true);
  };

  
    const handleDeleteSermon = async (devotionId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/devotions/${devotionId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh products after deletion
      const { products } = await response.json();
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  // Temporary: Define formattedDevotions as an empty array to avoid compile error
  const formattedDevotions: any[] = [];

   const formattedEvents: any[] = [];
  const formattedSermons: any[] = [];
  const formattedGalleryItems: any[] = [];  

  if (isLoading || !user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f4b500]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ProfileHeader
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          avatar={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=82cee4&color=fff`}
          joinedDate={new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          role={user.role}
          onEditAvatar={handleEditAvatar}
        />

        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdmin={user.role === "admin"}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-[#f4b500] shadow-sm p-6"
        >
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f4b500] hover:bg-[#f4b500] text-black font-bold rounded-full transition-colors"
                  >
                    <Edit size={16} /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-[#f4b500] hover:bg-[#f4b500] text-black font-bold rounded-full transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <ProfileInfoSection
                  firstName={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                  shippingAddress={{
                    street: formData.shippingStreet,
                    city: formData.shippingCity,
                    state: formData.shippingState,
                    zip: formData.shippingZip,
                    country: formData.shippingCountry
                  }}
                  billingAddress={{
                    street: formData.billingStreet,
                    city: formData.billingCity,
                    state: formData.billingState,
                    zip: formData.billingZip,
                    country: formData.billingCountry
                  }}
                />
              ) : (
                <ProfileEditForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                  onCancel={() => setIsEditing(false)}
                />
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
             {/*} {isLoadingOrders ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f4b500]"></div>
                </div>
              ) : orders.length > 0 ? (
                <OrderList orders={orders} onStartShopping={handleStartShopping} />
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                  <button
                    onClick={handleStartShopping}
                    className="mt-4 px-4 py-2 bg-[#f4b500] hover:bg-[#f4b500] text-black font-bold rounded-full transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}*/}
            </div>
          )}

          {activeTab === "users" && user.role === "admin" && (
            <AdminTable
              title="User Management"
              columns={[
                {
                  key: "name",
                  label: "Name",
                  render: (name: string) => (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                      </div>
                    </div>
                  ),
                },
                { key: "email", label: "Email" },
                {
                  key: "role",
                  label: "Role",
                  render: (role: string) => (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        role === "admin"
                          ? "bg-[#f4b500] text-black"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {role}
                    </span>
                  ),
                },
                { key: "joined", label: "Joined" },
                { key: "orders", label: "Orders" },
              ]}
              data={formattedUsers}
              loading={isLoadingUsers}
              pagination={pagination}
              onPageChange={handlePageChange}
              onSearch={handleSearch}
              onAdd={handleAddUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          )}

          {activeTab === "products" && user.role === "admin" && (
            <AdminTable
              title="Product Management"
              columns={[
                { key: "name", label: "Product" },
                { key: "designer", label: "Designer" },
                {
                  key: "category",
                  label: "Category",
                  render: (category: string) => (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">
                      {category}
                    </span>
                  ),
                },
                {
                  key: "price",
                  label: "Price",
                  render: (price: number) => `Ksh ${price.toFixed(2)}`,
                },
                { key: "stock", label: "Stock" },
              ]}
              data={formattedProducts}
              loading={loading}
              error={error}
              onAdd={handleAddProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}

          {activeTab === "devotions" && user.role === "admin" && (
          <AdminTable
            title="Devotion Management"
            columns={[
              { key: "week", label: "Week" },
              { key: "date", label: "Date" },
              { key: "dayNumber", label: "Day" },
              { key: "theme", label: "Theme" },
              { key: "title", label: "Title" },
              {
                key: "focusReference",
                label: "Scripture",
                render: (ref: string) => (
                  <span className="text-sm italic text-gray-700">{ref}</span>
                ),
              },
            ]}
            data={formattedDevotions}
            loading={loading}
            error={error}
            onAdd={handleAddDevotion}
            onEdit={handleEditDevotion}
            onDelete={handleDeleteDevotion}
          />
        )}

        {activeTab === "events" && user.role === "admin" && (
  <AdminTable
    title="Event Management"
    columns={[
      { key: "title", label: "Title" },
      { key: "date", label: "Date" },
      { key: "time", label: "Time" },
      { key: "location", label: "Location" },
      { key: "category", label: "Category" },
      {
        key: "price",
        label: "Price",
        render: (price: string) => (
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
            {price}
          </span>
        ),
      },
      {
        key: "featured",
        label: "Featured",
        render: (featured: boolean) => (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              featured ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-600"
            }`}
          >
            {featured ? "Yes" : "No"}
          </span>
        ),
      },
    ]}
    data={formattedEvents}
    loading={loading}
    error={error}
    onAdd={handleAddEvent}
    onEdit={handleEditEvent}
    onDelete={handleDeleteEvent}
  />
)}

{activeTab === "sermons" && user.role === "admin" && (
  <AdminTable
    title="Sermon Management"
    columns={[
      { key: "title", label: "Title" },
      { key: "date", label: "Date" },
      { key: "speaker", label: "Speaker" },
      {
        key: "scripture",
        label: "Scripture",
        render: (ref: string) => (
          <span className="text-sm italic text-gray-700">{ref}</span>
        ),
      },
      {
        key: "duration",
        label: "Duration",
        render: (duration: string) => (
          <span className="text-xs text-gray-800">{duration}</span>
        ),
      },
      {
        key: "downloads",
        label: "Downloads",
        render: (count: number) => (
          <span className="text-sm font-medium text-blue-700">{count}</span>
        ),
      },
      {
        key: "transcript",
        label: "Transcript",
        render: (available: boolean) => (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              available ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600"
            }`}
          >
            {available ? "Yes" : "No"}
          </span>
        ),
      },
      {
        key: "studyGuide",
        label: "Study Guide",
        render: (available: boolean) => (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              available ? "bg-indigo-200 text-indigo-800" : "bg-gray-200 text-gray-600"
            }`}
          >
            {available ? "Yes" : "No"}
          </span>
        ),
      },
    ]}
    data={formattedSermons}
    loading={loading}
    error={error}
    onAdd={handleAddSermon}
    onEdit={handleEditSermon}
    onDelete={handleDeleteSermon}
  />
)}

{activeTab === "gallery" && user.role === "admin" && (
  <AdminTable
    title="Gallery Management"
    columns={[
      { key: "title", label: "Title" },
      {
        key: "image",
        label: "Image",
        render: (url: string) => (
          <img
            src={url}
            alt="Gallery Item"
            className="w-16 h-16 object-cover rounded"
          />
        ),
      },
      {
        key: "description",
        label: "Description",
        render: (text: string) => (
          <p className="text-sm text-gray-700 max-w-xs truncate">{text}</p>
        ),
      },
    ]}
    data={formattedGalleryItems}
    loading={loading}
    error={error}
    onAdd={handleAddGalleryItem}
    onEdit={handleEditGalleryItem}
    onDelete={handleDeleteGalleryItem}
  />
)}
        </motion.div>
      </main>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddProduct={handleProductAdded}
      />

            <DevotionModal
        isOpen={isDevotionModalOpen}
        onClose={() => setIsDevotionModalOpen(false)}
        onAddDevotion={handleDevotionAdded}
      />

      <SermonModal
        isOpen={isSermonModalOpen}
        onClose={() => setIsSermonModalOpen(false)}
        onAddSermon={handleSermonAdded}
      />

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onAddEvent={handleEventAdded}
      />

      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        onAddGalleryItem={handleGalleryItemAdded}
      />

      <LuxuryFooter />
    </div>
  );
};

export default ProfilePage;