import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserById, updateUser } from "@/services/users.service";
import toastMsg from "@/utils/toastMsg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const username = useRef(localStorage.getItem("username") || "");
  const [userData, setUserData] = useState({
    username: username.current,
    email: "",
  });

  const [password, setPassword] = useState({
    curr: "",
    new: "",
  });

  const userId = localStorage.getItem("userId");

  const updateUserData = () => {
    try {
      updateUser(userId, userData);
      localStorage.setItem("username", userData.username);
      toastMsg("Data updated successfully", "👏");
    } catch (error) {
      toastMsg(error.message, "☠");
    }
  };

  const updatePassword = async () => {
    try {
      const data = await getUserById(userId);
      if (data[0].password !== password.curr) {
        return toastMsg("Current password is incorrect", "☠");
      }
      console.log(password);
      updateUser(userId, { password: password.new });
      toastMsg("Password updated successfully", "👏");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toastMsg(error.message, "☠");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "1") {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <div className="flex gap-4 items-center">
      {loggedIn ? `Welcome! ${username.current}` : "Please Login"}

      <Dialog>
        <DialogTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={userData.username}
                      onChange={(e) =>
                        setUserData((prev) => {
                          return { ...prev, username: e.target.value };
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      defaultValue={userData.email}
                      onChange={(e) =>
                        setUserData((prev) => {
                          return { ...prev, email: e.target.value };
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={updateUserData}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input
                      id="current"
                      type="password"
                      value={password.curr}
                      onChange={(e) =>
                        setPassword((prev) => {
                          return { ...prev, curr: e.target.value };
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input
                      id="new"
                      type="password"
                      value={password.new}
                      onChange={(e) =>
                        setPassword((prev) => {
                          return { ...prev, new: e.target.value };
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={updatePassword}>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
