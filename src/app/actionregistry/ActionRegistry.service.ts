import { Injectable } from '@angular/core';

export interface Action {
  id: string;
  callback: () => void;
}

@Injectable()
export class ActionRegistryService {

  actions: Map<string, Action>;

  constructor() {
    this.actions = new Map<string, Action>();
  }

  register(action: Action) {
    this.actions.set(action.id, action);
  }

  get(id: string) {
    return this.actions.get(id);
  }

  getAll() {
    return this.actions.values();
  }
}
