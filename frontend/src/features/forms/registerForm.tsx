import { useForm } from "react-hook-form";

// import { RegisterFormData } from "../types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { registerSchema } from "@/types/zod/authForm";
import { registerService } from "@/services/authServices";
import { useDispatch } from "react-redux";
import { setNotification } from "@/stores/slice/toasterNotif";
import { HttpResponseCode } from "@/types/response";


const RegisterForm : React.FC = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      photo: ''
    }
  })
  const dispatch = useDispatch();
  const { mutateAsync } = useMutation(async (data : FormData) => {
    const response = await registerService(data);
    return response;
  })
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {

    try{
      console.log(data.photo[0])
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);
      formData.append('photo', data.photo[0]);
      const response = await mutateAsync(formData)
      dispatch(setNotification({ message: response.body.message, isError: response.code === HttpResponseCode.Created ? false : true }));
    } catch(error) {
      const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setNotification({ message: errorMessage, isError: true }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input type="file" onChange={(e) => field.onChange(e.target.files)}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default RegisterForm;