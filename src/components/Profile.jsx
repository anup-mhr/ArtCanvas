import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const username = useRef(localStorage.getItem("username") || "");
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "1") {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <div className="flex gap-4 items-center">
      {loggedIn ? `Welcome! ${username.current}` : "Please Login"}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
