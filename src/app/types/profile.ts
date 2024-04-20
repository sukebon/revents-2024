export type Profile = {
  id: string;
  photoURL: string | null;
  displayName: string | null;
  createdAt: string;
  description: string;
  followerCount?: number;
  followingCount?: number;
  isFollowing: boolean;
};

export type Photo = {
  id: string;
  displayName: string;
  url: string;
};

export type Follow = {
  id: string;
  displayName: string;
  photoURL: string;
};