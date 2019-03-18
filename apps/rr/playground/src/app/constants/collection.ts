import { PlayCollection } from '../interfaces/collection.interface';

export const PlayCollections: PlayCollection[] = [
  { name: 'Users', service: 'UserService' },
  { name: 'Albums', service: 'AlbumService' },
  { name: 'Comments', service: 'CommentService' },
  { name: 'Photos', service: 'PhotoService' },
  { name: 'Todos', service: 'TodoService' }
];
