import React from 'react';
import styled from '@emotion/styled'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  text-align: center;
  height: 50px;
  > .heading {
    font-size: 40pt;
    color: white;
    font-family: "Courier New", Courier, monospace;
  }
  > .author {
    font-size: 15pt;
    color: white;
    font-style: italic;
    font-family: "Courier New", Courier, monospace;
  }

  @media (max-width: 600px) {
    > .heading{
      font-size: 20pt;
    }
    > .author{
      font-size: 10pt;
      flex-direction: row;
    }
  }
`;

const Perimeter = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  font-size: 13pt;
  background-color: #0077B5;
  color: white;
  border: none;
  @media (max-width: 500px) {
    font-size: 10pt;
  }
`;

/**
 * External site linked to button in header
 */
const openSite = () => {
  const url = 'https://www.linkedin.com/in/chandrakishoredanduri/';
  window.open(url, '_blank');
}

/**
 * Simple styling for the Header
 */
const Header = () => {
  return (
    <StyledDiv>
      <div className='heading'>JSCOMPILER</div>
      <Perimeter className='author'>
        <div>Kishore</div>
        <div><StyledButton onClick={openSite}>Linked <i className='fa fa-linkedin-square'></i></StyledButton></div>
      </Perimeter>
    </StyledDiv>
  );
};

export default Header;