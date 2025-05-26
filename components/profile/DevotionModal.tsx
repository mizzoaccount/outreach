"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";

interface DevotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDevotion: (devotion: any) => void;
}

interface DevotionFormData {
  week: string;
  date: string;
  dayNumber: number | string;
  theme: string;
  mainScripture: string;
  title: string;
  focusScripture: string;
  focusReference: string;
  reflection: string;
  prayer: string;
  actionPoint: string;
}

export const DevotionModal = ({ isOpen, onClose, onAddDevotion }: DevotionModalProps) => {
  const [formData, setFormData] = useState<DevotionFormData>({
    week: "",
    date: "",
    dayNumber: "",
    theme: "",
    mainScripture: "",
    title: "",
    focusScripture: "",
    focusReference: "",
    reflection: "",
    prayer: "",
    actionPoint: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/devotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dayNumber: Number(formData.dayNumber),
          date: new Date(formData.date).toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit devotion');
      }

      const result = await response.json();
      onAddDevotion(result.devotion);
      onClose();
      
      // Reset form
      setFormData({
        week: "",
        date: "",
        dayNumber: "",
        theme: "",
        mainScripture: "",
        title: "",
        focusScripture: "",
        focusReference: "",
        reflection: "",
        prayer: "",
        actionPoint: ""
      });
    } catch (error) {
      console.error('Error submitting devotion:', error);
      alert('Error submitting devotion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Devotion</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Week*</label>
                  <input
                    type="text"
                    name="week"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.week}
                    onChange={handleInputChange}
                    placeholder="e.g. Week 20"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day Number*</label>
                  <input
                    type="number"
                    name="dayNumber"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.dayNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 5"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme*</label>
                  <input
                    type="text"
                    name="theme"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.theme}
                    onChange={handleInputChange}
                    placeholder="e.g. The Holy Spirit"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Scripture*</label>
                  <input
                    type="text"
                    name="mainScripture"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.mainScripture}
                    onChange={handleInputChange}
                    placeholder="e.g. John 14:16–17"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. The Spirit as Seal and Guarantee"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Focus Scripture Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Focus Scripture</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scripture Text*</label>
                  <textarea
                    name="focusScripture"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.focusScripture}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scripture Reference*</label>
                  <input
                    type="text"
                    name="focusReference"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.focusReference}
                    onChange={handleInputChange}
                    placeholder="e.g. Ephesians 1:13–14"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Reflection Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Reflection</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reflection Content*</label>
                <textarea
                  name="reflection"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.reflection}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Prayer & Action Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Prayer</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prayer Text*</label>
                  <textarea
                    name="prayer"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.prayer}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Action Point</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Action*</label>
                  <textarea
                    name="actionPoint"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.actionPoint}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Devotion"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};