import { ApiResponse, MessageResponse } from '@/types/response';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

export const messageFeedService = async (
  authToken: string,
  id: string
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
