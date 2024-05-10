// import { Button } from "@/components/ui/button";

import Logout from "@/components/Logout";
import Profile from "@/components/Profile";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="py-4 px-10 container flex justify-between items-center shadow-md">
      <Link to="/dashboard" className="text-black text-2xl font-semibold">
        ArtCanvas
      </Link>
      <div className="flex space-x-4">
        <Profile />
        <Logout />
      </div>
    </div>
  );
}
