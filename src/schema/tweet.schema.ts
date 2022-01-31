import { object, string, TypeOf } from 'zod';

export const addTweetSchema = object({
  body: object({
    text: string({
      required_error: 'Text is required',
    }),
  }),
});

export type AddTweetInput = TypeOf<typeof addTweetSchema>;
