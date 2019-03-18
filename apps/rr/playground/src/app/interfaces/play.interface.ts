import { Response } from '@firetask/reactive-record';

import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { CommentService } from '../services/comment.service';
import { PhotoService } from '../services/photo.service';
import { TodoService } from '../services/todo.service';

export type PlayService =
  | UserService
  | AlbumService
  | CommentService
  | PhotoService
  | TodoService;

export type PlayResponse = Response | any;
