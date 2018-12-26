import { Component } from '@angular/core';
import { TitleService } from '@ngstack/translate';
import { OnInit } from '@angular/core';
import { FileSystemService } from './filesystem/filesystem.service';
import { ActionRegistryService } from './actionregistry/ActionRegistry.service';
import { ConsoleService } from './console/console.service';
import { EditorService } from './editor/editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private titleService: TitleService,
              private fileSystem: FileSystemService,
              private actionRegistry: ActionRegistryService,
              private consoleService: ConsoleService,
              private editorService: EditorService) { }

  ngOnInit() {
    this.titleService.setTitle('APP.TITLE');
    this.actionRegistry.register({
      id: 'save',
      callback: () => {
        this.fileSystem.writeFile('home/classes/demo/Fib', this.editorService.getText());
        this.consoleService.appendText('File written');
      }
    });
    this.actionRegistry.register({
      id: 'compile',
      callback: () => {
        console.log('compile clicked');
      }
    });
    this.actionRegistry.register({
      id: 'run',
      callback: () => {
        console.log('run clicked');
      }
    });
    this.fileSystem.initializeFileSystem(() => this.init());
  }

  init() {
    const sourceDir = '/sys/vendor/java_home';
    const sourceFile = 'classes/demo/Fib';
    const javaFileExtension = '.java';
    this.fileSystem.hackCopyFileToPersistentStorage(sourceDir, sourceFile, javaFileExtension, content => {
      this.editorService.setText(content);
    });

    this.fileSystem.hookOnStdOut((text: string) => this.consoleService.appendText(text));
    this.fileSystem.hookOnStdErr((text: string) => this.consoleService.appendText(text));

    this.consoleService.appendText('Jacoda initialized');
  }
}
