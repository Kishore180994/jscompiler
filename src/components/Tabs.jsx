import React, { Component } from 'react';
import styled from '@emotion/styled'

const Tab = styled.div`
  display: block;
  margin: 0 0 -1px;
  padding: 5px 25px;
  font-weight: 600;
  text-align: center;
  color: white;
  float: left;
  border: 1px solid #abc;
  border-top: 2px solid #0af;
  border-bottom: 1px solid #fff;
`;

const Output = styled.textarea`
  height: calc(45vh - 100px);
  bottom: 0;
  border: none;
  color: white;
  float: left;
  font-family: FiraCode;
  font-size: 20px;
  flex: 0 1 40px;
  padding-top: 5px;
  background: #61605C;
  width: 99%;
  text-align: left;
`;

const StyledDiv = styled.div`
`;

const StyledOut = styled.div`
  @font-face {
    font-family: 'FiraCode';
    src: local('FiraCode'), url(../../../../public/fonts/FiraCode/eot/FiraCode-Bold.eot) format('eot');
  }
  height: calc(50vh - 100px);
  bottom: 0;
  font-weight: bold;
  border: none;
  font-family: FiraCode;
  font-size: 20px;
  border-top: 1px solid white;
  padding-left: 10px;
  padding-top: 10px;
  float: left;
  flex: 0 1 40px;
  color: ${props => (props.statusCode === 1) ? '#FE4F4F' : (props.statusCode === 0) ? '#5CFE4F' : 'white'};
  background: #61605C;
  width: 99%;
  text-align: left;
`;

/**
 * Tabs: Component which is used to show result.
 * For now, it is an extra setup.
 * I've used this component, so that I can used extra tabs with extra components
 * in the future.
 * `Props`:
 * children => 0: Status Message, 1: Result received form server
 * label => Name of the tab. For now, it is `Result`
 * statusCode => Used to style the status message.
 */
class Tabs extends Component {
  render() {
    const { children, label, statusCode } = this.props.children.props;
    return (
      /**Single children */
      <StyledDiv>
        <Tab>
          {label}
        </Tab>
        <StyledOut statusCode={statusCode}>
          <div>{children[0]}</div>
          <Output value={children[1]} readOnly />
        </StyledOut>
      </StyledDiv >
      /**Multiple children */
      // children.map(tab => {
      //   const { label, children } = tab.props;
      //   return (
      //     <ul>
      //       <li>{label}</li>
      //       <li>{children}</li>
      //     </ul>
      //   );
      // })
    );
  }
}

export default Tabs;