import { PlayMethod } from '../interfaces/method.interface';

export const PlayMethods: PlayMethod[] = [
  //
  // chaining methods
  {
    name: 'driver',
    placeholder: 'Driver',
    description: 'Custom driver',
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
    description: 'force the use of network call',
    default: 'true',
    platform: ['browser', 'server'],
    type: 'boolean',
    value: 'true',
    target: 'chain'
  },
  {
    name: 'useCache',
    placeholder: 'Use Cache',
    description:
      'when true the first response should be from the cache if exists',
    default: 'true',
    platform: ['browser'],
    type: 'boolean',
    value: 'true',
    target: 'chain'
  },
  {
    name: 'transformResponse',
    placeholder: 'Transform Response',
    description: 'a callback function to transform the response',
    default: 'response',
    platform: ['browser'],
    type: 'callback',
    target: 'chain',
    value: `(response: Response) => {
    // do whatever with the response
    return response;
}`
  },
  //
  // executor methods
  {
    name: 'find',
    placeholder: 'Find',
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'findOne',
    placeholder: 'Find One',
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'get',
    placeholder: 'Get',
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'post',
    placeholder: 'Post (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'patch',
    placeholder: 'Patch (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'delete',
    placeholder: 'Delete (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'update',
    placeholder: 'Update (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'set',
    placeholder: 'Set (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'exec'
  },
  {
    name: 'on',
    placeholder: 'On (soon)',
    disabled: true,
    platform: ['browser', 'server'],
    target: 'exec'
  }
];
