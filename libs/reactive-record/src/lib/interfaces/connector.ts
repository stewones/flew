import { AxiosInstance } from 'axios';

export type Connector = {
  http?: AxiosInstance | any;
  firestore?: any;
  firebase?: any;
};
