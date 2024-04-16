import { Input } from "@/components/ui/input"
import { addFriendService } from "@/services/friendServices";
import { RootState } from "@/stores/store";
import { AddFriendRequestBody } from "@/types/types";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { addFriendSchema } from "@/types/zod/addFriend";
import { setToasterNotification } from "@/stores/slice/toasterNotif";
import { HttpResponseCode } from "@/types/response";

const AddFriend = () => {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const form = useForm<z.infer<typeof addFriendSchema>>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      friendUsername: '',
    }
  })
  const dispatch = useDispatch();
  const { mutateAsync } = useMutation(async ({ token, data }: { token: string, data: AddFriendRequestBody }) => {
    const response = await addFriendService(token, data);
    return response;
  })
  const onSubmit = async (data: z.infer<typeof addFriendSchema>) => {

    try{
      const response = await mutateAsync({ token: authToken!, data: data })
      console.log(response)
      dispatch(setToasterNotification({ message: response.body.message, isError: response.code === HttpResponseCode.Created ? false : true }));
      form.reset();
    } catch(error) {
      const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setToasterNotification({ message: errorMessage, isError: true }));
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="friendUsername"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Add friend" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  )
}

export default AddFriend