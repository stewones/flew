import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PlayCollection } from '../interfaces/collection.interface';
import { PlayMethod } from '../interfaces/method.interface';
import { PlayResponse, PlayPlatform } from '../interfaces/play.interface';
import { Log } from '@firetask/reactive-record';
import { PlayCollections } from '../constants/collection';
import { PlayMethods } from '../constants/method';
import {
  AddMethod,
  RemoveMethod,
  UpdateMethod,
  UpdateVerb
} from './method/method.actions';
import {
  addMethodReducer,
  removeMethodReducer,
  updateMethodReducer,
  updateVerbReducer
} from './method/method.reducers';
import { UpdateCollection } from './collection/collection.actions';
import { updateCollectionReducer } from './collection/collection.reducers';
import { AddLog, ClearLog } from './log/log.actions';
import { addLogReducer, clearLogReducer } from './log/log.reducers';
import { AddResponse, ClearResponse } from './response/response.actions';
import {
  addResponseReducer,
  clearResponseReducer
} from './response/response.reducers';
import { ClearChain } from './chain/chain.actions';
import { clearChainReducer } from './chain/chain.reducers';
import { AppService } from '../services/app.service';

declare var window;

export interface PlayStateModel {
  collections: PlayCollection[];
  selectedCollection: PlayCollection;
  methods: PlayMethod[];
  selectedMethods?: PlayMethod[];
  responses?: PlayResponse[];
  logs?: Log[];
  selectedVerb: PlayMethod;
  selectedPlatform: PlayPlatform;
  error?: any; // @todo implement
}

@State<PlayStateModel>({
  name: 'play',
  defaults: {
    collections: PlayCollections,
    selectedCollection: PlayCollections[0],
    methods: PlayMethods,
    selectedMethods: [],
    responses: [],
    logs: [],
    selectedVerb: PlayMethods.find(it => it.name === 'get'),
    selectedPlatform: 'browser'
  }
})
export class PlayState {
  //
  // Actions for Methods
  @Action(AddMethod) addMethod(
    context: StateContext<PlayStateModel>,
    action: AddMethod
  ) {
    addMethodReducer(context, action);
  }

  @Action(RemoveMethod)
  removeMethod(context: StateContext<PlayStateModel>, action: RemoveMethod) {
    removeMethodReducer(context, action);
  }

  @Action(UpdateMethod)
  updateMethod(context: StateContext<PlayStateModel>, action: UpdateMethod) {
    updateMethodReducer(context, action);
  }

  @Action(UpdateVerb)
  updateVerb(context: StateContext<PlayStateModel>, action: UpdateVerb) {
    updateVerbReducer(context, action);
  }

  //
  // Actions for Collections
  @Action(UpdateCollection)
  updateCollection(
    context: StateContext<PlayStateModel>,
    action: UpdateCollection
  ) {
    updateCollectionReducer(context, action);
  }

  //
  // Actions for Logs
  @Action(AddLog)
  addLog(context: StateContext<PlayStateModel>, action: AddLog) {
    addLogReducer(context, action);
  }

  @Action(ClearLog)
  clearLog(context: StateContext<PlayStateModel>, action: ClearLog) {
    clearLogReducer(context, action);
  }

  //
  // Actions for Chain
  @Action(ClearChain)
  clearChain(context: StateContext<PlayStateModel>, action: ClearChain) {
    clearChainReducer(context, action);
    this.app.clearChain$.next();
  }

  //
  // Actions for Responses
  @Action(AddResponse)
  addResponse(context: StateContext<PlayStateModel>, action: AddResponse) {
    addResponseReducer(context, action);
    const state = context.getState();
    const index = state.responses.indexOf(action.payload) + 1;
    const key = `response-tree-${index}`;
    setTimeout(() => {
      window.jsonTreeViewer(key).parse(action.payload);
    }, 0);
  }
  @Action(ClearResponse)
  clearResponse(context: StateContext<PlayStateModel>, action: AddResponse) {
    clearResponseReducer(context, action);
  }

  //
  // All Selectors
  @Selector()
  static methods(state: PlayStateModel) {
    return state.methods;
  }

  @Selector()
  static verbs(state: PlayStateModel) {
    return state.methods.filter(it => it.target === 'verb');
  }

  @Selector()
  static selectedMethods(state: PlayStateModel) {
    return state.selectedMethods;
  }

  @Selector()
  static selectedVerb(state: PlayStateModel) {
    return state.selectedVerb;
  }

  @Selector()
  static selectedPlatform(state: PlayStateModel) {
    return state.selectedPlatform;
  }

  @Selector()
  static collections(state: PlayStateModel) {
    return state.collections;
  }

  @Selector()
  static selectedCollection(state: PlayStateModel) {
    return state.selectedCollection;
  }

  @Selector()
  static logs(state: PlayStateModel) {
    return state.logs;
  }

  @Selector()
  static responses(state: PlayStateModel) {
    return state.responses;
  }

  @Selector()
  static isLogTrace(state: PlayStateModel) {
    return state.selectedMethods.find(
      (it: PlayMethod) => it.name === 'useLogTrace' && it.value === 'true'
    )
      ? true
      : false;
  }

  constructor(private app: AppService) {}
}
