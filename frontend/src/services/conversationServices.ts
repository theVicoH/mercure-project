import { ApiResponse, ConversationListResponse } from '@/types/response';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

export const conversationListService = async (
  authToken: string
): Promise<ApiResponse<ConversationListResponse[]>> => {
  try {
    const response = await fetch(`${URL}/conversation-list`, {
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
    throw new Error('Error when trying to retrieve conversations list');
  }
};
