export enum PublicRoutes {
  Login = '/login',
  Register = '/register',
}

export enum PrivateRoutes {
  AddFriend = '/add-friend',
  FriendsInfo = '/friends-info',
  SendMessage = '/send-message',
  MessagesFeed = '/messages-feed/:id',
  UserInfo = '/user-info',
  UsersInConversation = '/users-in-conversation/:id',
  ConversationList = '/conversation-list',
}
