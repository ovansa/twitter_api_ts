import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    username: string({ required_error: 'Username is required' }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    confirmPassword: string({
      required_error: 'Confirm password is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export const updateUserSchema = object({
  body: object({
    name: string().nonempty({ message: 'Name cannot be empty' }),
    profile_picture: string().nonempty({
      message: 'Profile picture cannot be empty',
    }),
  }),
});

export const updatePasswordSchema = object({
  body: object({
    currentPassword: string({
      required_error: 'Current password is required',
    }),
    newPassword: string({
      required_error: 'New password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }).refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password should be different from your old password',
    path: ['newPassword'],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.confirmPassword'
>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>;
export type UpdateUserDetailsInput = TypeOf<typeof updateUserSchema>;
