import React, { Component } from 'react';
import AceEditor from 'react-ace'
import styled from '@emotion/styled'

/**
 * These are in built modes available
 * from ACE-Editor, which helps to color code
 * the code based on the mode
 */
//modes
import 'brace/mode/javascript';
import 'brace/mode/python';

/**
 * Inbuilt themes available from ACE-Editor
 */
//themes
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/chrome';
import 'brace/theme/terminal';
import 'brace/theme/crimson_editor';
import 'brace/theme/dracula';
import 'brace/theme/eclipse';

/**
 * Auto complete helper tools from ACE-Editor
 */
import 'brace/ext/language_tools';

const StyledButton = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  float:left;
  cursor: pointer;
  height: 50px;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  :hover{
    background-color: #100D00;
  }
`;

/**
 * Editor: Component that uses ACE-Editor.
 * `props`:
 * state => main state
 * onChange => Keeps tracks of the text entered into editor
 * showResult => Send the text to showResult on button press.
 */
class Editor extends Component {
  render() {
    const { state, onChange, showResult = () => { } } = this.props;
    let divWidth = state.dimensions.width + 'px';
    let divHeight = state.dimensions.height - 30 + 'px';
    return (
      <div>
        <AceEditor
          readOnly={false}
          fontSize={state.options.fontSize}
          showPrintMargin
          showGutter
          height={divHeight}
          width={divWidth}
          focus
          wrapEnabled
          highlightActiveLine
          mode={state.options.mode}
          theme={state.options.theme}
          onChange={onChange}
          name={state.options.name}
          value={state.options.value}
          tabSize={state.options.tabSize}
          // $blockScrolling
          enableBasicAutocompletion
          enableLiveAutocompletion
          enableSnippets
          setOptions={{
            showLineNumbers: true,
          }}
        />
        <StyledButton onClick={showResult.bind(this.props.state.options.mode, this.props.state.options, 3)}>Run</StyledButton>
      </div>
    );
  }

}

// Editor.propTypes = {
//   onChange: PropTypes.func.isRequired,
// };

export default Editor;