import { PlayMethod } from '../interfaces/method.interface';

export const PlayMethods: PlayMethod[] = [
  //
  // chaining methods
  {
    name: 'driver',
    placeholder: 'Driver',
    description: 'Use a custom driver.',
    default: 'firestore',
    platform: ['browser', 'server'],
    type: 'select',
    target: 'chain',
    value: 'firestore',
    options: ['http', 'firebase', 'firestore'],
    valueTransform: value => `'${value}'`
  },
  {
    name: 'useNetwork',
    placeholder: 'Use Network',
    description: 'Force the use of a network call.',
    default: 'true',
    platform: ['browser'],
    type: 'boolean',
    value: 'true',
    target: 'chain'
  },
  {
    name: 'saveNetwork',
    placeholder: 'Save Network',
    description: 'Whether to cache network response or not.',
    default: 'true',
    platform: ['browser'],
    type: 'boolean',
    value: 'true',
    target: 'chain'
  },
  {
    name: 'useCache',
    placeholder: 'Use Cache',
    description:
      'When true the first response should be from the cache if exists.',
    default: 'true',
    platform: ['browser'],
    type: 'boolean',
    value: 'true',
    target: 'chain'
  },
  {
    name: 'transformResponse',
    placeholder: 'Transform Response',
    description: 'A callback function to transform the response.',
    default: 'response',
    platform: ['browser', 'server'],
    type: 'callback',
    target: 'chain',
    value: `(response: Response) => {
    // do whatever with the response
    return response;
}`
  },
  {
    name: 'transformCache',
    placeholder: 'Transform Cache',
    description:
      'A callback function to transform the cache before storing it.',
    default: 'response',
    platform: ['browser'],
    type: 'callback',
    target: 'chain',
    value: `(response: Response) => {
    // do whatever with the response
    return response;
}`
  },
  {
    name: 'useLog',
    placeholder: 'Use Log',
    description: `Controls whether or not display any log. When true it displays a colorful log in console.`,
    default: 'true',
    platform: ['browser', 'server'],
    type: 'boolean',
    value: 'true',
    target: 'chain'
  },
  {
    name: 'useLogTrace',
    placeholder: 'Use Log Trace',
    description: `When true it should display default console.log with stack trace`,
    default: 'false',
    platform: ['browser', 'server'],
    type: 'boolean',
    value: 'false',
    target: 'chain'
  },
  //
  // verb methods
  {
    name: 'find',
    placeholder: 'Find',
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'findOne',
    placeholder: 'Find One',
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'get',
    placeholder: 'Get',
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'post',
    placeholder: 'Post (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'patch',
    placeholder: 'Patch (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'delete',
    placeholder: 'Delete (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'update',
    placeholder: 'Update (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'set',
    placeholder: 'Set (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'verb'
  },
  {
    name: 'on',
    placeholder: 'On (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'verb'
  }
];
