import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex-1">
        <Outlet />
      </div>
    </div>
  );
}
