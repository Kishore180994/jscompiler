var fs = require('fs');
const path = require('path');
const codeRunner = require('../codeRunners/codeRunner');

/**
 * Upon button clicked in editor, request is recieved by
 * the router, and then `runFile` method will be executed.
 * `data received from the request`:
 * lang: either javascript or python
 * code: text received from the editor
 */
module.exports.runFile = (req, res) => {
  let lang = req.params.lang;
  let code = req.body;
  let dir= '';
  /**
   * based on the language, it creates a folder named 'temp'
   * and creates a respective file
   * javascript => Hello.js
   * python => Hello.py
   */
  switch(lang){
    case 'javascript': 
      dir = path.join(__dirname, 'temp', 'Hello.js');
      break;
    case 'java':
      dir = path.join(__dirname, 'temp', 'Hello.java'); 
      break;
    case 'python':
      dir = path.join(__dirname, 'temp', 'Hello.py'); 
      break;
    default: 
      dir = path.join(__dirname, 'temp', 'Hello.js');  
      break;
  }
  /**
   * after creating a file, using file system, 
   * we write the text to the file
   */
  let val = code.value;
  fs.writeFileSync(dir, val, (err)=>{
    console.error(err);
  })

  /**
   * And we send the file details to the `coderunner`,
   * where, coderunner uses the node js `spawn` child
   * module from nodejs
   */
  codeRunner.run(lang, dir, (output)=>{
    console.log(output);
    res.send(output);
  });
}

/**
 * GetTemplate: We already store some pre-defined 
 * templates into the server, which loads on user
 * selection.
 */
module.exports.getTemplate = (req, res) => {
  let lang = req.params.lang;
  let dir= '';
  switch(lang){
    case 'javascript': 
      dir = path.join(__dirname, 'templates', 'Hello.js');
      break;
    case 'java':
      dir = path.join(__dirname, 'templates', 'Hello.java'); 
      break;
    case 'python':
      dir = path.join(__dirname, 'templates', 'Hello.py'); 
      break;
    default: 
      dir = path.join(__dirname, 'templates', 'Hello.js');  
      break;
  }

  /**
   * Reading the text from the file
   */
  let templateCode = fs.readFileSync(dir, (err)=>{
    console.log(err);
  });

  /**
   * Send the response with the text from the file
   */
  res.send(templateCode.toString());
}