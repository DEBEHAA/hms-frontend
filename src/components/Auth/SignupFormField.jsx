import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignupFormField = ({
  label,
  name,
  placeholder,
  formControl,
  inputType,
  disabled,
}) => {
  return (
    <FormField
      control={formControl}
      label={label}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="mb-10">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
              className="px-[15px] py-[22px] text-[15px] placeholder:text-gray-400"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

export default SignupFormField;
