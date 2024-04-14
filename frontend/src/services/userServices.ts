import { ApiResponse, UserInfoResponse } from "@/types/response";

const URL = import.meta.env.VITE_REACT_APP_API_URL;

export const userInfoService = async (
  authToken: string
): Promise<ApiResponse<UserInfoResponse>> => {
  try {
    const response = await fetch(`${URL}/user-info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const responseData = await response.json();
    
    return responseData;
  } catch {
    throw new Error('Error when trying to retrieve user info');
  }
};