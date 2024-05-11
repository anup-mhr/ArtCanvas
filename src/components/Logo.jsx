import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/dashboard" className="text-black text-2xl font-semibold">
      ArtCanvas
    </Link>
  );
}
