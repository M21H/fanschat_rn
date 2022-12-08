export interface INotification {
  authorName: string;
  commentId: string;
  created: string;
  event: string;
  postId: string;
  postTitle: string;
  room: string;
  senderId: string;
  title: string;
  updated: string;
  wallId: string;
  _id: string;
  sender: ISender;
}

interface ISender {
  displayName: string;
  firstName: string;
  isOfficial: string;
  lastName: string;
  online: boolean;
  points: number;
  _id: string;
}
