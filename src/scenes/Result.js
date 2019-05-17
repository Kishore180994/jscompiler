import React, { Component } from 'react';
import Tabs from '../components/Tabs';
import styled from '@emotion/styled'

const StyledDiv = styled.div`
  height: 60%;
`;

const StyledSpan = styled.span`
  color:red;
`;

/**
 * Result: Component which shows the result which is received from server.
 * `props`:
 * status => StatusCode which is received from server
 * output => Status Message 
 */
class Result extends Component {
  render() {
    const { status, output } = this.props.value;
    // console.log('status',status);
    let statusMsg = '';
    if(status === 2){
      //Idle
      statusMsg = 'Press Run to compile';
    }else if(status === 3){
      //Compilation in progress
      statusMsg = 'compiling...';
    }else if(status === 0){
      //Compilation successful
      statusMsg = 'Compilation successful.';
    }else if(status === 1){
      //compilation failed
      statusMsg = 'Compilation failed.';
    }
    return (
      <StyledDiv >
        <Tabs StyledSpan={StyledSpan}>
          <div label='Result' statusCode={status}>
            {statusMsg}
            {output}
          </div>
        </Tabs>
      </StyledDiv>
    );
  }
}

export default Result;