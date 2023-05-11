export interface RoutePath {
  title: string;
  path: string;
}

export interface PostItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentItem {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface AlbumItem {
  userId: number;
  id: number;
  title: string;
}

export interface PhotoItem {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

// export interface UserUpdate extends User {
//   isCreate: boolean;
// }

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoAddress;
}

export interface GeoAddress {
  lat: string;
  lng: string;
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}
