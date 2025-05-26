import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

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

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
  
      console.log('Fetching products from:', 'https://extreme-backend.onrender.com/api/products');

      /*const response = await fetch('http://localhost:5000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });*/
  
      const response = await fetch('https://extreme-backend.onrender.com/api/products');
      const data = await response.json();

 
  
      console.log('Response received:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }
  
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { 
    products, 
    loading, 
    error,
    refresh: fetchProducts // Optional: add refresh capability
  };
};

export default useProducts;