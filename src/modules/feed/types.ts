export enum FeedSetupType {
  GALLERY = 'Gallery',
  CAROUSEL = 'Carousel',
  PAGER = 'Pager',
  PORTRAIT_CAROUSEL = 'PortraitCarousel',
  FEED = 'Feed',
}

export enum FeedContentType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum IDataSource {
  NEWS = 'News',
  VIDEOS = 'Videos',
  SOCIAL = 'Social',
  WALL = 'Wall',
}

export enum IFeedContentType {
  NEWS = 'News',
  VIDEOS = 'Videos',
  SOCIAL = 'Social',
}

export interface ITicker {
  clubId: string;
  created: string;
  language: string;
  languageCode: string;
  messages: string[];
  ownerId: string;
  updated: string;
  _id: string;
}

export interface IFeedSetup {
  background: string;
  title: string;
  seeAll: string;
  dataSource: IDataSource;
  titleColor: string;
  filterColor: string;
  filterSelectedColor: string;
  seeAllColor: string;
  filters: string[];
  content: IFeedData[];
  type: FeedSetupType;
}

export interface IFeedData {
  bodyText: string;
  contentType: FeedContentType;
  coverAspectRatio: number;
  created: string;
  imageUrl: string;
  language: string;
  likeCount: number;
  likedByMe: boolean;
  owner: IOwner;
  ownerId: string;
  shareCount: number;
  sourceLanguage: string;
  title: string;
  type: string;
  updated: string;
  url: string;
  uri: string;
  wallId: string;
  _id: string;
  watchCount: number;
  commentsCount?: number;
  videoUrl?: string;
  comments: {
    author: {
      clubId: string;
      commentsCount: string;
      created: string;
      displayName: string;
      firstName: string;
      followers: number;
      isAdmin: boolean;
      isGlobal: boolean;
      isOfficial: boolean;
      lastName: string;
      online: boolean;
      points: number;
      receivedLikes: number;
      updated: string;
      wallPosts: number;
      _id: string;
    };
    authorId: string;
    comment: string;
    created: string;
    postId: string;
    updated: string;
    _id: string;
  }[];
}

interface IOwner {
  avatarUrl: string;
  city: string;
  clubId: string;
  commentsCount: number;
  country: string;
  created: string;
  displayName: string;
  firstName: string;
  followers: number;
  isAdmin: boolean;
  isGlobal: boolean;
  isOfficial: boolean;
  lastName: string;
  online: boolean;
  points: number;
  receivedLikes: number;
  updated: string;
  wallPosts: number;
  _id: string;
}

export interface IComment {
  author: IOwner;
  authorId: string;
  comment: number;
  created: string;
  postId: string;
  updated: string;
  _id: string;
}

export interface IPost {
  bodyText: string;
  comments: IComment[];
  commentsCount: number;
  contentType: FeedContentType;
  coverAspectRatio: number;
  created: string;
  imageUrl: string;
  language: string;
  likeCount: number;
  likedByMe: boolean;
  owner: IOwner;
  shareCount: number;
  sourceLanguage: string;
  title: string;
  type: string;
  updated: string;
  uri: string;
  watchCount: number;
  wallId?: string;
  videoUrl?: string;
  _id: string;
}
