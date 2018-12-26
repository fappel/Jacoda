import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngstack/translate';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './editor/editor.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AceModule, AceConfigInterface, ACE_CONFIG } from 'ngx-ace-wrapper';
import { FileSystemService } from './filesystem/filesystem.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ActionRegistryService } from './actionregistry/ActionRegistry.service';
import { ConsoleComponent } from './console/console.component';
import { ConsoleService } from './console/console.service';
import { EditorService } from './editor/editor.service';
import { JvmService } from './jvm/jvm.service';

import * as browserfs from 'browserfs';
import FS, { FSModule } from 'browserfs/dist/node/core/FS';

export function setupTranslateService(service: TranslateService) {
  return () => service.load();
}

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  tabSize: 2
};

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ToolbarComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AceModule,
    FlexLayoutModule,
    TranslateModule.forRoot({})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateService,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    },
    FileSystemService,
    ActionRegistryService,
    ConsoleService,
    EditorService,
    JvmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
