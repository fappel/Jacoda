import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleService {

  listeners: Set<(text: any) => void>;
  text: string;

  constructor() {
    this.listeners = new Set<(text: any) => void>();
    this.text = '';
  }

  appendText(text: string): any {
    this.text += text + '\n';
    this.listeners.forEach(listener => listener(this.text));
  }

  addListener(listener: (text: any) => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: (text: any) => void) {
    this.listeners.delete(listener);
  }
}
