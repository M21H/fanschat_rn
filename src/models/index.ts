export type ApiResponseList<D> = {
  data: D;
  count: number;
};

export interface AuthenticatedUser {
  _id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  online: boolean;
  userType: string;
  isGlobal: boolean;
  isAdmin: boolean;
  country: string;
  city: string;
  location: number[];
  avatarUrl: string;
  clubId: string;
  commentsCount: number;
  receivedLikes: number;
  wallPosts: number;
  chats: number;
  publicChats: number;
  matches: number;
  following: number;
  videoChats: number;
  videosWatched: number;
  followers: number;
  capsLvL: number;
  daysUsingSSK: number;
  keywords: string[];
  updated: string;
  created: string;
  points: number;
  phone?: string;
  friends: string[];
}

export interface IFriend {
  _id: string;
  displayName: string;
  clubId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isGlobal: boolean;
  isAdmin: boolean;
  isOfficial: boolean;
  country: string;
  keywords: string[];
  commentsCount: number;
  receivedLikes: number;
  wallPosts: number;
  chats: number;
  publicChats: number;
  matches: number;
  following: number;
  videoChats: number;
  videosWatched: number;
  followers: number;
  capsLvL: number;
  created: Date;
  updated: Date;
  online: boolean;
  points: number;
  isFriendRequestPending: boolean;
  isFriendRequestSent: boolean;
  isFriend: boolean;
}

export interface IUser {
  capsLvL: number;
  chats: number;
  clubId: string;
  commentsCount: number;
  created: Date;
  displayName: string;
  email: string;
  firstName: string;
  followers: number;
  following: number;
  isAdmin: boolean;
  isFriend: boolean;
  isFriendRequestPending: boolean;
  isFriendRequestSent: boolean;
  isGlobal: boolean;
  isOfficial: boolean;
  keywords: string[];
  lastName: string;
  matches: number;
  phone: string;
  points: number;
  publicChats: number;
  receivedLikes: number;
  updated: Date;
  videoChats: number;
  videosWatched: number;
  wallPosts: number;
  _id: string;
  avatarUrl?: string;
}

export type TabType = { key: string; title: string; Component: React.ReactNode };
