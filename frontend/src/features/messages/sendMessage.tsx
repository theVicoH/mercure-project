import { sendMessageSchema } from "@/types/zod/sendMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "react-query"
import { sendMessageService } from "@/services/messagesServices"
import { SendMessageRequestBody } from "@/types/types"
import { RootState } from "@/stores/store"
import { setToasterNotification } from "@/stores/slice/toasterNotif"

const SendMessage = () => {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const id = useSelector((state: RootState) => state.currentConversation.conversationId);

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
      await mutateAsync({ token: authToken!, data: payload })
      form.reset();
    } catch(error) {
      const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setToasterNotification({ message: errorMessage, isError: true }));
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 px-5 py-4 bg-zinc-600/10 backdrop-blur-xl border-t border-zinc-800">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormControl>
              <Input className="rounded-full" placeholder="Enter your message" {...field} autoComplete="off" />
            </FormControl>
          )}
        />
        <Button className="m-0" type="submit">Send</Button>
      </form>
    </Form>
  )
}

export default SendMessage