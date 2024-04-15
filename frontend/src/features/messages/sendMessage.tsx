import { sendMessageSchema } from "@/types/zod/sendMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "react-query"
import { sendMessageService } from "@/services/messagesServices"
import { SendMessageRequestBody } from "@/types/types"
import { RootState } from "@/stores/store"
import { setNotification } from "@/stores/slice/toasterNotif"

const SendMessage = () => {
  const { id } = useParams<'id'>();
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  if (!authToken) {
    throw new Error("Authentication token is missing!");
  }
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      message: '',
    }
  })
  const dispatch = useDispatch();
  const { mutateAsync } = useMutation(async ({ token, data }: { token: string, data: SendMessageRequestBody }) => {
    const response = await sendMessageService(token, data);
    return response;
  })
  const onSubmit = async (data: z.infer<typeof sendMessageSchema>) => {
    const payload = {
      conversationId: Number(id),
      message: data.message,
    };
    try{
      await mutateAsync({ token: authToken, data: payload })
      form.reset();
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your message" {...field} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SendMessage