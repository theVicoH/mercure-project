import { ApiResponse } from "@/types/response";
import { registerSchema } from "@/types/zod/authForm";
import { z } from "zod";

export const registerService = async (data: z.infer<typeof registerSchema>) : Promise<ApiResponse> => {
  try {
    const url = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData
  } catch {
    throw new Error("Error when trying to register")
  }


}