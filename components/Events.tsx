
/*&"use client";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { useEffect, useState } from "react";

type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  image: string;
};

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received events data:", data); // ✅ Log full response
      console.log("Events array:", data.events);   // ✅ Log actual array

      const now = new Date();

      const upcoming: Event[] = data.events.filter((event: Event) => new Date(event.date) >= now);
      const past: Event[] = data.events.filter((event: Event) => new Date(event.date) < now);

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  fetchEvents();
}, []);



  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Ministry Events" 
          subtitle="Join Us in Ministry" 
          center
        />

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative group overflow-hidden rounded-lg shadow-md">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <h4 className="text-white font-bold">{event.title}</h4>
                      <p className="text-blue-200 text-sm">{event.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Past Events</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="relative group overflow-hidden rounded-lg shadow-md">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <h4 className="text-white font-bold">{event.title}</h4>
                      <p className="text-blue-200 text-sm">{event.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;*/

"use client";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, X, ChevronRight, User2, Tag, Wallet } from "lucide-react";
import Image from "next/image";
import Modal from "../ui/Modal";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  featured: boolean;
  image: string;
  speakers: string[];
  registrationRequired: boolean;
  registrationLink: string;
  price: string;
  tags: string[];
};

const EventCard = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        {event.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{event.title}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays className="h-4 w-4 mr-1 text-blue-600" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1 text-blue-600" />
            {event.time}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1 text-blue-600" />
          {event.location}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map((tag, i) => (
            <span 
              key={i} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
          View Details <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const now = new Date();
        const upcoming = data.events.filter((event: Event) => new Date(event.date) >= now);
        setEvents(upcoming);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const formatModalDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Ministry Events" 
          subtitle="Join Us in Fellowship" 
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EventCard 
                event={event} 
                onClick={() => openEventModal(event)} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeEventModal}>
        {selectedEvent && (
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl">
            <div className="relative h-64 w-full">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
              <button
                onClick={closeEventModal}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <X className="h-5 w-5 text-gray-800" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                      {selectedEvent.category}
                    </span>
                    {selectedEvent.featured && (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium">
                    {selectedEvent.price}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CalendarDays className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Date & Time</h3>
                      <p className="text-gray-600">
                        {formatModalDate(selectedEvent.date)} at {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Location</h3>
                      <p className="text-gray-600">{selectedEvent.location}</p>
                      <p className="text-gray-500 text-sm">{selectedEvent.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Speakers</h3>
                      <ul className="text-gray-600">
                        {selectedEvent.speakers.map((speaker, i) => (
                          <li key={i}>{speaker}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Tag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Tags</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedEvent.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">About This Event</h3>
                <div className="prose prose-sm text-gray-600">
                  {selectedEvent.description}
                </div>
              </div>

              {selectedEvent.registrationRequired ? (
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">Registration</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all">
                      Register Now
                    </button>
                    {selectedEvent.registrationLink && (
                      <a
                        href={selectedEvent.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg text-center transition-colors"
                      >
                        Visit Registration Page
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">Open Attendance</h3>
                  <p className="text-gray-600 mb-4">
                    No registration required. Just come and join us!
                  </p>
                  <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all">
                    Add to Calendar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Events;