import { useState,useContext,useEffect } from "react";
import  { AxiosError } from "axios";
import axios from "../api/axiosConfig"
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Context } from "@/context/authContext";

// Types for API response
interface ValidationError {
  param: string;
  msg: string;
  location?: string;
}

interface ApiError {
  message?: string;
  errors?: ValidationError[];
}

interface ValidationErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  general?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const {authorized, setAuthorized, redirected} = useContext(Context);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await axios.post("/auth/login", { email, password });
      setAuthorized(true);
      if (redirected){
        navigate(redirected, {replace:true});
    } else {
        navigate('/cars');
    }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ApiError>;
        
        if (error.response?.data.errors) {
          // Handle validation errors
          const validationErrors: ValidationErrors = {};
          error.response.data.errors.forEach((error) => {
            const param = error.param as keyof ValidationErrors;
            if (param === 'email' || param === 'password') {
              if (!validationErrors[param]) {
                validationErrors[param] = [];
              }
              validationErrors[param]!.push(error.msg);
            }
          });
          setErrors(validationErrors);
        } else if (error.response?.data.message) {
          // Handle custom error message
          setErrors({ general: error.response.data.message });
        } else if (error.message) {
          // Handle network errors
          setErrors({ general: "Network error. Please check your connection." });
        }
      } else {
        // Handle unexpected errors
        setErrors({ general: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
        setIsLoading(false);
    } else {
        axios.get('/verify').then(()=>{
            setAuthorized(true);
            if (redirected){
                navigate(redirected, {replace:true});
            } else {
                navigate('/cars');
            }
        }).catch((error) => {
          console.log(error)
            setIsLoading(false);
        })
    }
}, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {errors.general && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="you@example.com"
                  required
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New user?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
