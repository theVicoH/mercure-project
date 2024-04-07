
export default interface IFriendUseCase {
  addFriend: (userId: number, friendUsername: string) => void;
}
