/* eslint-disable react/prop-types */
import Capitalize from "@/utils/Caplitalize";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";

export default function CustomFormField({ form, type, name }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{Capitalize(name)}</FormLabel>
          <FormControl>
            <Input
              placeholder={`Enter your ${name}`}
              type={type ? type : ""}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
