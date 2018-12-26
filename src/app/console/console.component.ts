import { Component, OnInit } from '@angular/core';
import { ConsoleService } from './console.service';
import { SelectorContext } from '@angular/compiler';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass']
})
export class ConsoleComponent implements OnInit {

  text: string;

  constructor(private consoleService: ConsoleService) {
    this.consoleService.addListener((text: string) => this.setText(text));
  }

  ngOnInit() {

  }

  setText(text: string) {
    this.text = text;
  }
}
