"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { X, Youtube, FileText } from "lucide-react";

interface SermonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSermon: (sermon: any) => void;
}

interface SermonFormData {
  title: string;
  description: string;
  date: string;
  speaker: string;
  scripture: string;
  mediaType: "youtube" | "pdf" | "";
  videoId: string;
  pdfFile: File | null;
  transcript: boolean;
  studyGuide: boolean;
}

export const SermonModal = ({ isOpen, onClose, onAddSermon }: SermonModalProps) => {
  const [formData, setFormData] = useState<SermonFormData>({
    title: "",
    description: "",
    date: "",
    speaker: "",
    scripture: "",
    mediaType: "",
    videoId: "",
    pdfFile: null,
    transcript: false,
    studyGuide: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        pdfFile: e.target.files![0]
      }));
    }
  };

  const extractVideoId = (url: string) => {
    // Simple YouTube URL parsing (could be enhanced)
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', new Date(formData.date).toISOString());
      formDataToSend.append('speaker', formData.speaker);
      formDataToSend.append('scripture', formData.scripture);
      formDataToSend.append('transcript', String(formData.transcript));
      formDataToSend.append('studyGuide', String(formData.studyGuide));
      
      if (formData.mediaType === 'youtube') {
        formDataToSend.append('videoId', extractVideoId(formData.videoId));
      } else if (formData.mediaType === 'pdf' && formData.pdfFile) {
        formDataToSend.append('pdfFile', formData.pdfFile);
      }

      const response = await fetch('http://localhost:5000/api/sermons', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit sermon');
      }

      const result = await response.json();
      onAddSermon(result.sermon);
      onClose();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        speaker: "",
        scripture: "",
        mediaType: "",
        videoId: "",
        pdfFile: null,
        transcript: false,
        studyGuide: false,
      });
    } catch (error) {
      console.error('Error submitting sermon:', error);
      alert('Error submitting sermon. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Sermon</h2>
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
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Sermon Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.description}
                    onChange={handleInputChange}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speaker*</label>
                  <input
                    type="text"
                    name="speaker"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.speaker}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scripture Reference*</label>
                  <input
                    type="text"
                    name="scripture"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.scripture}
                    onChange={handleInputChange}
                    placeholder="e.g. John 3:16-17"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Media Type Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Media Content*</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mediaType: "youtube", pdfFile: null }))}
                  className={`flex-1 flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${formData.mediaType === "youtube" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"}`}
                  disabled={isSubmitting}
                >
                  <div className="flex flex-col items-center">
                    <Youtube size={32} className="text-red-600 mb-2" />
                    <span>YouTube Video</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mediaType: "pdf", videoId: "" }))}
                  className={`flex-1 flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${formData.mediaType === "pdf" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"}`}
                  disabled={isSubmitting}
                >
                  <div className="flex flex-col items-center">
                    <FileText size={32} className="text-blue-600 mb-2" />
                    <span>PDF Document</span>
                  </div>
                </button>
              </div>

              {formData.mediaType === "youtube" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL or Video ID*</label>
                  <input
                    type="text"
                    name="videoId"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.videoId}
                    onChange={handleInputChange}
                    placeholder="e.g. https://youtu.be/dQw4w9WgXcQ or dQw4w9WgXcQ"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {formData.mediaType === "pdf" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF File*</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="pdfUpload"
                      required
                      disabled={isSubmitting}
                    />
                    <label 
                      htmlFor="pdfUpload" 
                      className={`cursor-pointer flex flex-col items-center ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                      <div className="mb-2 text-blue-500">
                        <FileText size={24} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {formData.pdfFile ? formData.pdfFile.name : "Click to upload PDF file"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {!formData.pdfFile && "Max file size: 10MB"}
                      </p>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Options</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="transcript"
                    name="transcript"
                    checked={formData.transcript}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="transcript" className="ml-2 block text-sm text-gray-700">
                    Has Transcript
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="studyGuide"
                    name="studyGuide"
                    checked={formData.studyGuide}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="studyGuide" className="ml-2 block text-sm text-gray-700">
                    Has Study Guide
                  </label>
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
                disabled={isSubmitting || !formData.mediaType}
              >
                {isSubmitting ? "Adding..." : "Add Sermon"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};