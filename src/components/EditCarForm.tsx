import { useState, useRef } from 'react';
import axios from '../api/axiosConfig';
import { X } from 'lucide-react';

interface Car {
  _id: string;
  title: string;
  description: string;
  imageUrls?: string[];
  tags?: string[];
}

interface EditCarFormProps {
  car: Car;
  onCancel: () => void;
  onSuccess: (car: Car) => void;
}

const EditCarForm = ({ car, onCancel, onSuccess }: EditCarFormProps) => {
  const [title, setTitle] = useState(car.title);
  const [description, setDescription] = useState(car.description);
  const [tags, setTags] = useState(car.tags?.join(', ') || '');
  const [newImages, setNewImages] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare tags array
      const tagsArray = tags.split(',')
                           .map(tag => tag.trim())
                           .filter(tag => tag !== '');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', JSON.stringify(tagsArray)); // Send tags as JSON string
      
      if (deletedImages.length > 0) {
        formData.append('deletedImages', JSON.stringify(deletedImages));
      }

      newImages.forEach(image => {
        formData.append('images', image);
      });

      const response = await axios.put(`/api/cars/${car._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSuccess(response.data);
    } catch (err) {
      setError('Failed to update car');
      console.error(err);
    }
  };


  const handleImageDelete = (imageUrl: string) => {
    setDeletedImages([...deletedImages, imageUrl]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 10 - (car.imageUrls?.length || 0) + deletedImages.length;
    
    if (files.length > remainingSlots) {
      setError(`You can only add up to ${remainingSlots} more images`);
      return;
    }
    
    setNewImages(files);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Car Details</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Current Images</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {car.imageUrls?.filter(url => !deletedImages.includes(url)).map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Car ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(url)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Add New Images</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditCarForm;