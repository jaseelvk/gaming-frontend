import React from "react";
import styled from "styled-components";
import HeaderImage from "../../assets/images/logo.png";
import SearchImage from "../../assets/images/search.svg";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/Store";

function Header({ setSearchTerm }) {
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const handleLogout = () => {
    dispatch({ type: "SIGNOUT" });
    navigate("/");
  };
 

  return (
    <MainContainer>
      <HeaderFlex>
        <HeaderLogoContainer>
          <HeaderLogo src={HeaderImage} />
        </HeaderLogoContainer>
        <SearchContainer>
          <SearchItem
            type="text"
            placeholder="Search You Want...!"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIconContainer>
            <SearchIcon src={SearchImage} />
          </SearchIconContainer>
        </SearchContainer>
        <HeaderItems>
          <HeaderItem href='/'>Home</HeaderItem>
          <HeaderItem href='#'>About</HeaderItem>
          <HeaderItem href='#'>Contact</HeaderItem>
          <LogoutItem onClick={handleLogout}>Logout</LogoutItem>
        </HeaderItems>
      </HeaderFlex>
    </MainContainer>
  );
}

const MainContainer = styled.section`
  border-bottom: 1px solid #DBDBDB;
  box-shadow: 0px 8px #f7f6f6;
`;

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0px 10px;
`;

const HeaderLogoContainer = styled.div`
  width: 120px;
  display: block;
`;

const HeaderLogo = styled.img`
  width: 100%;
  display: block;
`;

const SearchContainer = styled.div`
  width: 50%;
  border: 1px solid #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 7px;
`;

const SearchItem = styled.input`
  color: #000;
  width: 100%;
`;

const SearchIconContainer = styled.span`
  width: 28px;
  display: block;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 100%;
  display: block;
`;

const HeaderItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

const HeaderItem = styled.a`
  font-size: 15px;
  font-weight: 600;
`;

const LogoutItem = styled(HeaderItem)`
  background-color: #ff4d4d; 
  color: white;
  cursor: pointer;
  padding: 10px 15px; 
  border-radius: 5px; 
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: #ff1a1a; 
  }
`;

export default Header;
