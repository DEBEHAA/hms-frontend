import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePatient } from "@/db/patient";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import DashFormField from "../shared/DashFormField";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const hospitalSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string()
    .refine(
      (val) => {
        if (val === "") return true;
        return z.string().email().safeParse(val).success;
      },
      { message: "Invalid email address" },
    )
    .optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  address: z.string().optional(),
});

const PatientProfileFormFields = ({ userData, photo }) => {
  const setUser = useStore((state) => state.setUser);

  const form = useForm({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: userData.name || "",
      email: userData.email || "",
      age: userData.profile?.age || "",
      gender: userData.profile?.gender || undefined,
      bloodGroup: userData.profile?.bloodGroup || undefined,
      address: userData.profile?.address || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: (result) => {
      if (result.status === "success") {
        toast("Profile updated successfully", {
          type: "success",
        });

        setUser(result.data?.user);
      }
    },
    onError: (error) => {
      console.error(error);
      toast("Profile update failed", { type: "error" });
    },
  });

  const handleProfileUpdate = (values) => {
    const patientData = {
      ...values,
      photo,
    };

    console.log(patientData);

    updateMutation.mutate(patientData);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="relative space-y-3"
          onSubmit={form.handleSubmit(handleProfileUpdate)}
        >
          <DashFormField
            label="Name"
            name="name"
            placeholder="Enter your name"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Email"
            name="email"
            placeholder="Enter email address"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Age"
            name="age"
            inputType="number"
            placeholder="Enter your age"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={updateMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full py-[22px] text-[15px]">
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Blood Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={updateMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full py-[22px] text-[15px]">
                      <SelectValue placeholder="Select a blood group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bloodGroups.map((bGroup) => (
                      <SelectItem key={bGroup} value={bGroup}>
                        {bGroup}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <DashFormField
            label="Address"
            name="address"
            placeholder="Enter full address"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <div className="pt-2 text-center">
            <Button
              disabled={updateMutation.isPending}
              className="bg-blue px-6 py-[25px] hover:bg-blue/90"
              type="submit"
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PatientProfileFormFields;
