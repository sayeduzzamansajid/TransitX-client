import { Link } from "react-router";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
      <h1 className="text-9xl font-bold text-primary mb-6">404</h1>
      <h2 className="text-3xl font-semibold text-neutral mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you are looking for does not exist. It might have been removed, 
        or you may have typed the URL incorrectly.
      </p>
      <Link
        to="/"
        className="btn btn-primary"
      >
        Go Back Home
      </Link>
    </div>
  );
}
