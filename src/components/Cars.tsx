import { useEffect, useState } from "react";
import axios from '../api/axiosConfig';
import CarCard from "./CarCard";
import { Input } from "@/components/ui/input";
import { Search as MagnifyingGlassIcon } from "lucide-react";

interface Cars {
  _id: string;
  title: string;
  description: string;
  imageUrls?: string[];
  user: string;
  tags?: string[];
}

const CarList = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const [filteredCars, setFilteredCars] = useState<Cars[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/cars");
        setCars(response.data);
      } catch (err) {
        console.error("Failed to fetch cars", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const query = searchQuery.toLowerCase();
      return (
        car.title.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query) ||
        (car.tags && car.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });
    setFilteredCars(filtered);
  }, [searchQuery, cars]);

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Cars</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or tags..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car: Cars) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
