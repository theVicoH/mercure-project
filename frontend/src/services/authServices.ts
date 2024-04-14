import { ApiResponse, LoginResponse } from '@/types/response';
import { loginSchema, registerSchema } from '@/types/zod/authForm';
import { z } from 'zod';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

export const registerService = async (
  data: z.infer<typeof registerSchema>
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch {
    throw new Error('Error when trying to register');
  }
};

export const loginService = async (
  data: z.infer<typeof loginSchema>
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch {
    throw new Error('Error when trying to login');
  }
};
