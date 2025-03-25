"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, { message: "Name must be at least 3 characters" })
        : z.string().optional(),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });
};

function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        // Sign up logic
        toast.success("Account Created Successfully. Please sign in!");
        router.push("/sign-in");
        console.log(values);
      } else {
        // Sign in logic
        toast.success("Signed in successfully!");
        router.push("/");
        console.log(values);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  }
  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">NextHire</h2>
        </div>
        <h3>Practice Interviews & Streamline Hiring with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
                type="text"
                icon={<User size={16} />}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@example.com"
              type="email"
              icon={<Mail size={16} />}
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              icon={<Lock size={16} />}
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
