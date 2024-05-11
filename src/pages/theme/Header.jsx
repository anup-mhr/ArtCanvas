import Logo from "@/components/Logo";
import Logout from "@/components/Logout";
import Profile from "@/components/Profile";

export default function Header() {
  return (
    <div className="py-4 px-10 container flex justify-between items-center shadow-md">
      <Logo />
      <div className="flex space-x-4">
        <Profile />
        <Logout />
      </div>
    </div>
  );
}
