import { Component, OnInit } from '@angular/core';
import { ActionRegistryService, Action } from '../actionregistry/ActionRegistry.service';
import { ActionSequence } from 'protractor';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  actions: Array<Action>;

  constructor(private actionRegistry: ActionRegistryService) { }

  ngOnInit() {
    this.actions = Array.from(this.actionRegistry.getAll());
  }

  triggerAction(id: string) {
    this.actionRegistry.get(id).callback();
  }
}
