const { spawn } = require('child_process');
const path = require('path');

function javascriptRunner(){
  function log(message) {
    console.log('Status Code: ',message);
  }
  /**
   * `spawn` child module need the following parameter in order to execute the scipt:
   * -> Directory of the file
   * -> filename
   * -> Command: 'node' in this case
   */
    async function run(file,fileName, dir, fullDir, fileExt, callback){
      // set working directory for child_process
      let directory = path.parse(dir).dir;
      
      const options = { cwd: directory };
      let message= '';

      /**
       * we are storing the result in this JSON
       */
      let res = {
        status: 0,
        output: ''
      };

      /**
       * Arguments required to run the script
       * argsrun = [ ' Hello.js ' ]
       */
      const argsRun = [];
      argsRun[0] = file;

      /**
       * Initializing the compiler for executing the javscript file
       */
      const executor = spawn('node', argsRun, options); 
      /**
       * On Success, returns with statusCode: 0
       * and Compiled result
       */
      await executor.stdout.on('data', (output) => {
        // console.log('Output',String(output));
        message += output.toString();
        res = {
          status: 0,
          output: message,
        }
      });
      /**
       * On Error, returns with statusCode: 1
       * and Error message
       */
      await executor.stderr.on('data', (output) => {
        // console.log(`stderr: ${String(output)}`);
        message += output.toString();
        res = {
          status: 1,
          output: message,
        }
      });

      /**
       * Closing the child module, 
       * Sending the result to the CodeRunner through callbacl
       * javascriptRunner => codeRunner => server => axios => this.state
       */
      executor.on('close', (output) => {
        log(`stdout: ${output}`);
        return callback(res);
      });
    }

  return({
    run,
    log
  });
};

module.exports = javascriptRunner;


