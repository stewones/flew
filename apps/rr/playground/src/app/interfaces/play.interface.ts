import { Response } from '@reactive/records';

import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { CommentService } from '../services/comment.service';
import { PhotoService } from '../services/photo.service';
import { TodoService } from '../services/todo.service';
import { UserServerService } from '../services/user-server.service';

export type PlayService =
  | UserService
  | AlbumService
  | CommentService
  | PhotoService
  | TodoService
  | UserServerService;

export type PlayResponse = Response | any;

export interface PlayCache {
  key: string;
  data: any;
  collection: string;
}

export type PlayPlatform = 'browser' | 'server';
