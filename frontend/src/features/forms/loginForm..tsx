import { useForm } from "react-hook-form";

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
import { loginSchema } from "@/types/zod/authForm";
import { loginService } from "@/services/authServices";
import { useDispatch } from "react-redux";
import { setNotification } from "@/stores/slice/toasterNotif";
import { HttpResponseCode } from "@/types/response";
import { setJwtToken } from "@/stores/slice/auth";


const LoginForm : React.FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })
  const dispatch = useDispatch();
  const { mutateAsync } = useMutation(async (data : z.infer<typeof loginSchema>) => {
    const response = await loginService(data);
    return response;
  })
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try{
      const response = await mutateAsync(data)
      if ('data' in response.body && response.code === HttpResponseCode.OK) {
        const { jwt, expiration } = response.body.data;
        dispatch(setJwtToken({jwt, expiration}));
        dispatch(setNotification({ message: response.body.message, isError: false }));
      } else {
        dispatch(setNotification({ message: response.body.message, isError: true }));
      }
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default LoginForm;