import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-8xl font-bold text-red-400 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          The page you’re looking for doesn’t exist or has been moved. Don’t
          worry, let’s get you back on track.
        </p>
        <Link to="/" className="btn btn-primary px-6">
          🔙 Go to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
