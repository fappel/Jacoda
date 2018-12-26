import { Injectable } from '@angular/core';

@Injectable()
export class EditorService {

  text: string;
  listeners: Set<(text: any) => void>;

  constructor() {
    this.listeners = new Set<(text: any) => void>();
    this.setText('');
  }

  setText(text: string) {
    this.updateText(text);
    this.listeners.forEach(listener => listener(this.text));
  }

  updateText(text: string): any {
    this.text = text;
  }

  getText() {
    return this.text;
  }

  addListener(listener: (text: any) => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: (text: any) => void) {
    this.listeners.delete(listener);
  }
}
