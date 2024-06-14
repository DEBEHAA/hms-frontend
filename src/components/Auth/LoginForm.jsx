import { login } from "@/db/auth";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import SignupFormField from "./SignupFormField";

const formSchema = z.object({
  mobileNo: z
    .string()
    .min(11, { message: "Mobile no must be at least 11 characters long" })
    .max(11, { message: "Mobile no must be at least 11 characters long" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNo: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast("Login successful", {
          type: "success",
        });

        form.reset();
        setUser(data.data?.user);

        return navigate(`/dashboard/${data.data?.user?.role}`);
      } else {
        toast("Login failed", { type: "error", description: data.message });
      }
    },
    onError: (error) => {
      console.error(error);
      toast("Login failed", { type: "error" });
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="relative space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <SignupFormField
            label="Mobile No."
            name="mobileNo"
            placeholder="Enter your mobile no."
            formControl={form.control}
            disabled={loginMutation.isPending}
          />
          <SignupFormField
            label="Password"
            name="password"
            placeholder="Enter your password"
            inputType="password"
            formControl={form.control}
            disabled={loginMutation.isPending}
          />

          <Button
            className="w-full bg-blue py-[22px] text-[15px] hover:bg-blue/90"
            type="submit"
            disabled={loginMutation.isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
