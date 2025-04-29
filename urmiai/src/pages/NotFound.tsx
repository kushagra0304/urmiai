import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-indigo-600">404</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page not found</h1>
          <p className="mt-4 text-base text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="mt-10">
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 