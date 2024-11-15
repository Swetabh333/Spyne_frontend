
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Car } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="flex flex-col items-center">
          <Car className="h-16 w-16 text-blue-600" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900">Welcome to CarGo</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your personal car management system
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <LogIn className="h-5 w-5" />
            Sign in to your account
          </Link>

          <Link
            to="/register"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <UserPlus className="h-5 w-5" />
            Create new account
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Manage your vehicles, track maintenance, and keep all your car-related information in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;