import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  return (
    <Button
      className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md w-100 h-10"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
