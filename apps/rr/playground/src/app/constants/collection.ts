import { PlayCollection } from '../interfaces/collection.interface';

export const PlayCollections: PlayCollection[] = [
  {
    name: 'Users',
    service: 'UserService',
    info: `
interface User extends Response<User> {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
  `
  },
  {
    name: 'Albums',
    service: 'AlbumService',
    info: `  
interface Album extends Response<Album> {
  id: number;
  userId: number;
  title: string;
}
  `
  },
  {
    name: 'Comments',
    service: 'CommentService',
    info: `
interface Comment extends Response<Comment> {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
  `
  },
  {
    name: 'Photos',
    service: 'PhotoService',
    info: `
interface Photo extends Response<Photo> {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}  
  `
  },
  {
    name: 'Todos',
    service: 'TodoService',
    info: `
interface Todo extends Response<Todo> {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
} 
  `
  }
];
