import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { Trash2, Edit2 } from 'lucide-react';
import EditCarForm from './EditCarForm';

interface Car {
  _id: string;
  title: string;
  description: string;
  imageUrls?: string[];
  user?: string;
  tags?: string[];
}

const CarDetails = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError('Failed to fetch car details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    
    try {
      await axios.delete(`/api/cars/${id}`);
      navigate('/cars');
    } catch (err) {
      setError('Failed to delete car');
      console.error(err);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!car) return <div className="text-center">Car not found</div>;

  return (
    <div className="container mx-auto p-4 mt-14">
      {isEditing ? (
        <EditCarForm car={car} onCancel={() => setIsEditing(false)} onSuccess={(updatedCar) => {
          setCar(updatedCar);
          setIsEditing(false);
        }} />
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{car.title}</h1>
            <div className="space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Edit2 size={24} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{car.description}</p>
              </div>
              
              {car.tags && car.tags.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {car.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {car.imageUrls && car.imageUrls.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Images</h2>
                <div className="grid grid-cols-2 gap-4">
                  {car.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${car.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
