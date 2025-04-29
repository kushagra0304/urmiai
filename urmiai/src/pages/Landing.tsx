import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#1C1A1C] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[#FF335F]">Urmi AI</h1>
        <p className="text-xl mb-10 text-gray-300">
          An intelligent voice assistant platform for managing your calls
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-[#FF335F] rounded-lg font-semibold hover:bg-[#e62b55] transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-3 bg-transparent border border-[#FF335F] text-[#FF335F] rounded-lg font-semibold hover:bg-[#FF335F]/10 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing; 