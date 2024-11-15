import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { Tag, Car } from "lucide-react";
import { Link } from "react-router-dom";

interface Cars {
  _id: string;
  title: string;
  description: string;
  imageUrls?: string[];
  user: string;
  tags?: string[];
}

interface CarCardProps {
  car: Cars;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/cars/${car._id}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {car.title}
        </CardTitle>
      </CardHeader>

      <div className="relative h-48 overflow-hidden">
        {car.imageUrls && car.imageUrls.length > 0 ? (
          <Carousel className="w-full h-full">
            {car.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${car.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover"
                />
              ))}
          </Carousel>
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <Car className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <CardContent className="pt-4">
        <p className="text-gray-600 line-clamp-2">{car.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2">
        <div className="text-sm text-gray-500">Car ID: {car._id}</div>
        {car.tags && car.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {car.tags.map((tag, index) => (
              <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardFooter>
        </Link>
    </Card>
  );
};

export default CarCard;