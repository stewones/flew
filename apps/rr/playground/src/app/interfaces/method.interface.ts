export interface Method {
  name: string;
  description: string;
  type: 'boolean' | 'responseCallback';
  default: string;
  platform: Array<'browser' | 'server'>;
}
