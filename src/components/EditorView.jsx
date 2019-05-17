import React, { Component } from 'react';
import Header from '../scenes/Header';
import Accordion from './Accordion';
import Options from '../scenes/Options';
import Editor from '../scenes/Editor';
import Result from '../scenes/Result';
import axios from 'axios';
import styled from '@emotion/styled'

const Perimeter = styled.div`
  display: flex;
  flex-direction: ${props => props.flow ? "row" : "column"};
  justify-content: space-around;
  // padding: 1em;
  height: 100%;
`;

const Left = styled.span`
  margin-left: 0;
`;

const Right = styled.span`
  width: 100vw;
  height: 99%;
  overflow-x: ${props => props.state.dimensions.width > 500 ? "hidden" : "scroll"};
  overflow-y: hidden;
`;

/**
 * Main component which displays the Editor, Options and Result components
 */
class EditorView extends Component {
  constructor(props) {
    super(props);

    /**
     * Props used by the entire project
     */
    this.state = {
      /**
       * URL: This is the url used to connect to server
       * If you want to modify server and check for the changes prefer localhost
       * else deploy to the heroku
       */
      url: 'http://radiant-scrubland-17484.herokuapp.com',
      // url: 'http://localhost:3001',

      /**
       * Dimensions: Stored the width and height of the Editor component
       * THis is stored in order for the editor window to resize automatically when the browser changes
       * helpful even used in mobile devices
       */
      dimensions: {
        width: '',
        height: '',
      },

      /**
       * Result: Stores the status codes and output received from server
       * StatusCode: 0 => Compilation successful
       * StatusCode: 1 => Compilation failed
       * StatusCode: 2 => Default, Press run to compile
       * StatusCode: 3 => waiting for the server to receive the output. Msg: 'Compiling...'
       */
      result: {
        status: 2, //Default status
        output: '',
      },

      /**
       * Options: Required by the ACE editor
       * These options are dynamically changed according to User selection
       * and applied to ACE Editor.
       */
      options: {
        name: 'jscompiler',
        value: '//please wait for the template to load...',
        fontSize: 15,
        mode: 'javascript',
        theme: 'monokai',
        tabSize: 2,
        showLineNumbers: true
      },

      /**
       * ToggleOptions: Boolean value used to Show/Hide options on User onclick.
       */
      toggleOptions: false,
    };
  };

  /**
   * UpdateDimensions: Function used to record editor width and height dynamically. 
   */
  updateDimensions = () => {
    let divWidth = this.refs.right.clientWidth;
    let divHeight = this.refs.right.clientHeight;
    if (divWidth < 500) divWidth = '500';
    this.setState({
      dimensions: {
        width: divWidth,
        height: divHeight,
      },
    })
  }

  /**
   * React Hook-> Load the default template, which is javascript.
   * Template will be received from the server.
   * In this function, added an event listener 'resize' which is
   * responsible for editor window resize.
   */
  async componentDidMount() {
    this.updateDimensions();
    let url = `${this.state.url}/api/file/getTemplate/${this.state.options.mode}`
    await axios.get(url)
      .then(res => {
        let updatedOptions = this.state.options;
        updatedOptions.value = res.data;
        this.setState({ options: updatedOptions });
      })
      .catch(err => console.log(err));
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  /**
   * Removing an event listener 'resize' in order to update dimensions,
   * which is actually refreshing the component by setting the dimensions from 
   * the state at the unmount hook.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  /**
   * getProperties: Function, passed as prop to the options component
   * Whenever change is detected from the options component, the updated options
   * are sent back to getProperties function, which in turn changes the options in state 
   */
  getProperties = e => {
    this.setState({ options: e });
  }

  /**
   * loadTemplate: Function, passes as prop to the options component
   * whenever mode is changed i.e., javascript -> python or vice-versa,
   * loadTemplate is called with the options as props and update the template
   * which is received from server.
   */
  loadTemplate = async (options) => {
    let language = options.mode;
    let url = `${this.state.url}/api/file/getTemplate/${language}`
    await axios.get(url)
      .then(res => {
        options.value = res.data;
        this.setState({ options: options });
      })
      .catch(err => console.log(err));
  }

  /**
   * onChange: function, passed as prop to the Editor component,
   * which keep track of the text typed in the editor.
   */
  onChange = (newValue) => {
    const newOptions = this.state.options;
    newOptions.value = newValue;
    this.setState({ options: newOptions });
  }

  /**
   * onButtonClick: function passes as prop to Accordion component,
   * which keep track of the boolean value which is essential to show/hide the
   * options.
   */
  onButtonClick = (e) => {
    this.setState({
      toggleOptions: e,
    });
  }

  /**
   * showResult: function passes as prop to the Editor component, which is
   * executed on button press, where the data is sent to server and receives
   * data from sever and update status in the state with the result.
   */
  showResult = (mode, options, statusCode) => {
    this.setState({
      result: {
        status: 3,
        output: '',
      }
    });
    this.postData(`${this.state.url}/api/file/${mode.mode}`, mode)
      .then()// JSON-string from `response.json()` call
      .catch(error => console.error(error));
  }

  /**
   * Calling Axios 
   * + Sending the text to server
   * + Receiving the result with status from server
   */
  postData = async (url, data) => {
    return await axios.post(url, data)
      .then(res => {
        this.setState({ result: res.data });
        return res.data;
      })
      .catch(err => console.log(err));
  }

  /**
   * Render: React life cycle method.
   */
  render() {
    /**
     * Prop: Setting the textarea style which is used for the result.
     */
    let textAreaStyle = {
      border: 'none',
      padding: '5px',
      fontFamily: 'Tahoma, sans-serif',
      overflow: 'auto',
      marginLeft: '10px'
    }
    return (
      <Perimeter>
        {/**Header */}
        <Header />
        <Perimeter flow>
          {/**Options */}
          <Left>
            <Accordion onButtonClick={this.onButtonClick} clicked={this.state.toggleOptions}>
              <Options getProperties={this.getProperties} presentState={this.state} loadTemplate={this.loadTemplate} />
            </Accordion>
          </Left>
          {/**Editor */}
          <Right ref="right" state={this.state}>
            <Editor state={this.state} onChange={this.onChange} showResult={this.showResult} />
          </Right>
        </Perimeter>
        {/**Result */}
        <Result style={textAreaStyle} value={this.state.result} />
      </Perimeter>
    );
  }
}

export default EditorView;