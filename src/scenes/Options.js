import React from 'react';
import styled from '@emotion/styled';

const Perimeter = styled.div`
  display: flex;
  flex-direction: ${props => props.flow ? "column" : "row"};
  padding: 10px;
  & > div{
   margin: ${props => props.label === 'true' ? "15px 0px" : "5px 0px"};
   text-align: right;
   font-style: bold;
   letter-spacing: 0.2em;
   font-family: "Times New Roman", Times, serif;
  }
  & > select, input{
    padding: 10px;
    text-align: center;
    margin: 5px;
  }

  @media (max-width: 600px) {
    & > div{
      margin: ${props => props.label === 'true' ? "8px 0px" : "5px 0px"};
  }
  }
`;

const Options = ({ getProperties, presentState, loadTemplate = () => {}}) => {
  /**
   * Modes given to options
   */
  let modes = ['javascript', 'python'];
  /**
   * Themes made availale to editor
   */
  let themes = ['monokai', 'github','tomorrow', 'kuroir', 'twilight', 'xcode', 'chrome', 'terminal', 'crimson_editor', 'dracula', 'eclipse'];

  /**
   * This function is called upon change in every options component
   */
  let setProperties = (val, type) => {
    if (type === 'font') presentState.options.fontSize = val;
    else if (type === 'mode'){
      presentState.options.mode = val;
      loadTemplate(presentState.options);
    } 
    else if (type === 'tab') presentState.options.tabSize = val;
    else if (type === 'theme') presentState.options.theme = val;
    getProperties(presentState.options);
  }
  return (
    <div>
    <Perimeter>
      {/**Modes */}
      <Perimeter flow label='true'>
        <div>Mode: </div>
        <div>Theme: </div>
        <div>Font Size: </div>
        <div>Tab: </div>
        <div>NewTab:</div>
      </Perimeter>
      <Perimeter flow>
      <select id='theme' value={presentState.options.mode} onChange={(e) => setProperties(e.target.value, 'mode')}>
        { modes.map((mode, i) => <option key={i} value={mode}>{mode}</option>) }
      </select>
      
      {/**Themes */}
        <select id='theme' value={presentState.options.theme} onChange={(e) => setProperties(e.target.value, 'theme')}>
            {themes.map((theme, i) => <option key={i} value={theme}>{theme}</option>)}
        </select>

      {/**Font Size */}
        <input type='Number' value={presentState.options.fontSize} min="10" max="50" onChange={(e) => setProperties(parseInt(e.target.value), 'font')} ></input>

      {/**Tab Size */}
        <input type='Number' value={presentState.options.tabSize} min="0" max="20" onChange={(e) => setProperties(parseInt(e.target.value), 'tab')}></input>
      
      {/** New Tab - Coming soon */}
      <input type='text' value='Coming soon..' readOnly />
      </Perimeter>
    </Perimeter>
    <p>New features and languages will be added soon...</p>
    </div>
  );
};


// Options.setFontSize = setFontSize;

export default Options;