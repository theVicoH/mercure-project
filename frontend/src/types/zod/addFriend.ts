import { z } from 'zod';

export const addFriendSchema = z.object({
  friendUsername: z.string().min(1, { message: 'Friend username not given' }),
});
