import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-extrabold tracking-wide">
        Tulu-English Sentiment
      </h1>
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/result" className="hover:text-blue-400">Result</Link>
        <Link to="/compare" className="hover:text-blue-400">Compare</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
      </div>
    </nav>
  );
}
