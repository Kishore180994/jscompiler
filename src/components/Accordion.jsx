import React, { Component } from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  background-color: green;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
  height: 100%;
  padding: 0;
  & > span {
    display: inline-block;
    transform: rotate(-90deg);
    text-align: center;
    letter-spacing: 5px;
    font: 20px arial, sans-serif;
    font-weight: bold;
    -ms-transform:rotate(90deg); /* IE 9 */
    -moz-transform:rotate(90deg); /* Firefox */
    -webkit-transform:rotate(90deg); /* Safari and Chrome */
    -o-transform:rotate(90deg); /* Opera */}
  }

  @media (max-width: 600px) {
    & > span{
      letter-spacing: 2px;
  }
`;

const Perimeter = styled.div`
  display:flex;
  height: 100%;
  width:100%;
  & > div{
    height: 100%;
    width:100%;
  }
`;

const Anim = styled.div``;

/**
 * This component show/hide the options on button press
 * Props:
 * children => Options Component
 * clicked => boolean
 * onButtonClick = toggles `clicked` value
 */
class Accordion extends Component {
  render() {
    const { children, clicked, onButtonClick = () => { } } = this.props;
    return (
      <Perimeter>
        <Anim>
          {clicked && children}
        </Anim>
        <div>
          {/**Toggles clicked value */}
          <StyledButton onClick={onButtonClick.bind(null, !clicked)}><span>Options</span></StyledButton>
        </div>
      </Perimeter>
    );
  }
}

export default Accordion;