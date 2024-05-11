import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "../components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import CustomFormField from "@/components/CustomFormField";
import { addUser } from "@/services/users.service";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .min(1, {
      message: "Username is required.",
    }),
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

export default function Signup() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      addUser(values);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mx-auto max-w-xs py-10 px-8 shadow-md bg-white rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create a Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField form={form} name="username" />
            <CustomFormField form={form} name="email" />
            <CustomFormField form={form} type="password" name="password" />
            <Button type="submit" className="w-full">
              Signup
            </Button>

            <Link to="/login" className="hover:underline text-xs">
              Already have an account? Sign-in
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
