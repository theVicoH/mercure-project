import { ApiResponse, MessageResponse } from '@/types/response';
import { SendMessageRequestBody } from '@/types/types';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

export const messageFeedService = async (
  authToken: string,
  id: number
): Promise<ApiResponse<MessageResponse[]>> => {
  try {
    const response = await fetch(`${URL}/messages-feed/${id}`, {
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
    throw new Error('Error when trying to retrieve messages list');
  }
};

export const sendMessageService = async (
  authToken: string,
  data: SendMessageRequestBody
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${URL}/send-message`, {
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
    throw new Error('Error when trying to send message');
  }
};