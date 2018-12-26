import { Injectable } from '@angular/core';
import * as BrowserFS from 'browserfs';
import { ConditionalExpr } from '@angular/compiler';

@Injectable()
export class FileSystemService {

  constructor() {
  }

  initializeFileSystem(callback: () => void) {
    this.constructPersistantFs(function (persistentFs) {
      const mfs = new BrowserFS.FileSystem.MountableFileSystem();
      const fs = BrowserFS.BFSRequire('fs');
      BrowserFS.initialize(mfs);
      mfs.mount('/home', persistentFs);
      mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
      mfs.mount('/sys', new BrowserFS.FileSystem.XmlHttpRequest('listings.json', 'assets/jvm'));

      fs.mkdir('/home');
      fs.mkdir('/home/classes');
      fs.mkdir('/home/classes/demo');
      callback();
    });
  }

  hackCopyFileToPersistentStorage(sourceDir: string, sourceFile: string, javaFileExtension: string, callback: (text: any) => void) {
    const fs = BrowserFS.BFSRequire('fs');
    fs.readFile(sourceDir + '/' + sourceFile + javaFileExtension, function(err, contents) {
        if (err) {
          console.log(err);
          return;
        }
        fs.writeFile('home/' + sourceFile + javaFileExtension, contents.toString(), function(err1) {
            if (err1) {
              console.log(err1);
              return;
            }
        });
        fs.readFile('home/' + sourceFile + javaFileExtension, function(err2, contents1) {
            if (err2) {
              console.log(err2);
              return;
            }
            callback(contents1.toString());
        });
    });
  }

  writeFile(fileName: string, content: string) {
    const fs = BrowserFS.BFSRequire('fs');
    fs.writeFile(fileName, content, function(err) {
        if (err) {
            console.log(err);
        }
    });
  }

  hookOnStdOut(callback: Function) {
    const process = BrowserFS.BFSRequire('process');
    // process.initializeTTYs();
    let stdoutBuffer = '';
    process.stdout.on('data', function(data) {
        stdoutBuffer += data.toString();
        let newlineIdx;
        while ((newlineIdx = stdoutBuffer.indexOf('\n')) > -1) {
          callback(stdoutBuffer.slice(0, newlineIdx + 1));
          stdoutBuffer = stdoutBuffer.slice(newlineIdx + 1);
        }
    });
  }

  hookOnStdErr(callback: Function) {
    const process = BrowserFS.BFSRequire('process');
    // process.initializeTTYs();
    let stderrBuffer = '';
    process.stderr.on('data', function(data) {
        stderrBuffer += data.toString();
        let newlineIdx;
        while ((newlineIdx = stderrBuffer.indexOf('\n')) > -1) {
          callback(stderrBuffer.slice(0, newlineIdx + 1));
          stderrBuffer = stderrBuffer.slice(newlineIdx + 1);
        }
    });
  }

  constructPersistantFs(cb) {
    if (BrowserFS.FileSystem.IndexedDB.isAvailable()) {
      const idbfs_1 = new BrowserFS.FileSystem.IndexedDB(function (e, fs) {
        if (e) {
          cb(new BrowserFS.FileSystem.InMemory());
        } else {
          cb(idbfs_1);
        }
      }, 'doppio-cache');
    } else if (BrowserFS.FileSystem.HTML5FS.isAvailable()) {
      const html5fs_1 = new BrowserFS.FileSystem.HTML5FS(100 * 1024 * 1024);
      html5fs_1.allocate(function (e) {
        if (e) {
          cb(new BrowserFS.FileSystem.InMemory());
        } else {
          cb(html5fs_1);
        }
      });
    } else {
      cb(new BrowserFS.FileSystem.InMemory());
    }
  }
}
