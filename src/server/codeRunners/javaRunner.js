const { spawn } = require('child_process');
const path = require('path');

function javaRunner(){
  function log(message) {
    console.log('Status Code: ',message);
  }
    async function run(file,fileName, dir, fullDir, fileExt, callback){
      // const executor = spawn('node', argsRun, options);
      // set working directory for child_process
      let directory = path.parse(dir).dir;
      
      const options = { cwd: directory };
      let message= '';
      let res = {
        status: 0,
        output: ''
      };
      const argsRun = [];
      argsRun[0] = 'Hello';

      const executor = spawn('java', argsRun, options); 
      executor.stdout.on('data', (output) => {
        // console.log('Output',String(output));
        message += output.toString();
        res = {
          status: 0,
          output: message,
        }
      });
      executor.stderr.on('data', (output) => {
        message += output.toString();
        res = {
          status: 1,
          output: message,
        }
      });
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

module.exports = javaRunner;


