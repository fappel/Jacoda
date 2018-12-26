import 'brace';
import 'brace/mode/java';
import 'brace/theme/eclipse';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  moduleId: 'src/app/editor/editor.component',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.sass']
})
export class EditorComponent implements AfterViewInit {

  public show = true;
  public type = 'component';
  public content = 'Some example content';
  public disabled = false;

  textChangeObserver: (text: any) => void;

  public config: AceConfigInterface = {
    mode: 'java',
    theme: 'eclipse',
    readOnly: false
  };

  @ViewChild(AceComponent) componentRef?: AceComponent;
  @ViewChild(AceDirective) directiveRef?: AceDirective;

  constructor(private editorService: EditorService) {
    this.textChangeObserver = text => this.setText(text);
  }

  ngAfterViewInit(): void {
    this.editorService.addListener(this.textChangeObserver);
  }

  setText(text: string) {
    this.directiveRef.ace().setValue(text);
    // this.content = text;
  }

  public onEditorBlur(event: any): void {
    // console.log('Editor blur:', event);
  }

  public onEditorFocus(event: any): void {
    // console.log('Editor focus:', event);
  }

  public onValueChange(value: string): void {
  //  console.log('Value change:', value);
  }

  public onContentChange(event: any): void {
    this.editorService.updateText(this.directiveRef.ace().getValue());
  }

  public onSelectionChange(event: any): void {
    // console.log('Selection change:', event);
  }
}
