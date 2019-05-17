const javascriptRunner  = require ('./javascriptRunner');
const javaRunner = require('./javaRunner');
const pythonRunner = require('./pythonRunner');
const fs = require('fs');
const path = require('path');

/**
 * CODERUNNER: it will execute the respective runner based on the language
 */
function codeRunner(lang, code){
  let edit ={
    lang: lang,
    code: code,
  }
  function getRunner() {
    let runner;
    let lang = edit.lang;
    if (lang === 'javascript') {
      runner = javascriptRunner();
    }
    else if(lang === 'java'){
      runner = javaRunner();
    }
    else if (lang === 'python') {
      runner = pythonRunner();
    }
    // else if (lang === 'c_cpp') {
    // }
    return runner;
  }

  return Object.freeze({
    getRunner,
  });
}

/**
 * This component have the details of the file to be executed.
 * This will call the runner, for example => javascriptRunner
 * Each runner will have the run method => which takes the detials
 * of the file as argument and invokes `spawn` child modules
 * and executes the script and return the result.
 */
module.exports = {
  run(lang, file, callback){
    const runner = new codeRunner(lang).getRunner();
    let fullfileName = path.parse(file).base; 
    let fileExt = path.parse(file).ext;
    let fileName = path.parse(file).name;
    fs.readFileSync(file, err=>{
      console.error(err)
    })

    /**
     * Executing the code in this module,
     * and get the result from the `callback`.
     */
    runner.run(fullfileName,fileName, file, __dirname, fileExt, ((code)=>{
      return callback(code);
    }));
  }
}