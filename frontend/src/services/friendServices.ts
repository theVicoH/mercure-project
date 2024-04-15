import { ApiResponse, UserInfoResponse } from "@/types/response";
import { AddFriendRequestBody } from "@/types/types";

const URL = import.meta.env.VITE_REACT_APP_API_URL;

export const addFriendService = async (
  authToken: string,
  data: AddFriendRequestBody
): Promise<ApiResponse<UserInfoResponse>> => {
  try {
    const response = await fetch(`${URL}/add-friend`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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