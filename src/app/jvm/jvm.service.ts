import { Injectable } from '@angular/core';
import { Doppio } from './../../assets/jvm/doppio';

@Injectable()
export class JvmService {

  compile(sourceDir, sourceFile) {
    Doppio.VM.CLI(
      // Arguments to the 'java' command.
      ['-classpath', '/sys/vendor/java_home', 'classes.util.Javac', '/home/' + sourceFile + '.java'], {
        doppioHomePath: '/sys'
    },
    function(exitCode) {
        if (exitCode === 0) {
            // Class finished executing successfully.
        } else {
            // Execution failed. :(
        }
    },
    function(jvmObject) {
        // [Optional callback] Called once the JVM is instantiated.
    });
  }

  run() {
    Doppio.VM.CLI(
      // Arguments to the 'java' command.
      ['-classpath', '/home', 'classes.demo.Fib', '43'], {
          doppioHomePath: '/sys'
      },
      function(exitCode) {
          if (exitCode === 0) {
              // Class finished executing successfully.
          } else {
              // Execution failed. :(
          }
      },
      function(jvmObject) {
          // [Optional callback] Called once the JVM is instantiated.
      });
  }
}
