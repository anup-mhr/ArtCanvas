import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "../components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import CustomFormField from "@/components/CustomFormField";
import { getUser } from "@/services/users.service";
import toastMsg from "@/utils/toastMsg";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Email is required.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .min(1, {
      message: "Password is required.",
    }),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = await getUser(values.email, values.password);
      if (data.length === 0) {
        toastMsg("Invalid Email or Password", "☠");
        return;
      }
      localStorage.setItem("username", data[0].username);
      localStorage.setItem("userId", data[0].id);
      localStorage.setItem("isLogin", 1);
      navigate("/dashboard", { Replace: true });
      toastMsg("Login Successful", "👏");
    } catch (error) {
      console.log(error);
      toastMsg(error.message, "💣");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mx-auto max-w-xs py-10 px-8 shadow-md bg-white rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField form={form} type="email" name="email" />
            <CustomFormField form={form} type="password" name="password" />
            <Button type="submit" className="w-full">
              Login
            </Button>

            <Link to="/signup" className="hover:underline text-xs">
              Don&apos;t have an account? Register
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
