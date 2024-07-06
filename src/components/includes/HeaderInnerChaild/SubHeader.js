import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Editlogo from '../../../assets/images/edit.svg';

function SubHeader() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log('Retrieved user role from localStorage:', role);
    setUserRole(role);
  }, []);

  const handleItemClick = (index) => {
    setActiveItem(index);
    if (index === 1) {
      handleSaveClick();
    }
  };

  const handleEditClick = () => {
    console.log('User role during handleEditClick:', userRole);
    if (userRole === 'admin') {
      navigate('/edit');
    } else {
      setErrorMessage('Only admins can add products');
    }
  };

  const handleSaveClick = () => {
    navigate('/wishlist');
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  return (
    <>
      <SubMainContainer>
        <SubHeaderFlex>
          <SubHeaderItemsContainer>
            {['All', 'Save Games', 'Buy Items', 'Outdoor Games', 'Simple Games', 'Open World Games'].map((item, index) => (
              <SubHeaderItems
                key={index}
                isActive={activeItem === index}
                onClick={() => handleItemClick(index)}
              >
                <SubHeaderItem>{item}</SubHeaderItem>
              </SubHeaderItems>
            ))}
            <EditIconContainer onClick={handleEditClick}>
              <EditLogo src={Editlogo} alt="Edit icon" />
            </EditIconContainer>
          </SubHeaderItemsContainer>
        </SubHeaderFlex>
      </SubMainContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
}

const SubMainContainer = styled.section`
  border-bottom: 1px solid #DBDBDB;
  box-shadow: 0px 8px #f7f6f6;
`;

const SubHeaderFlex = styled.div`
  padding: 20px;
`;

const SubHeaderItemsContainer = styled.ul`
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
`;

const SubHeaderItems = styled.li`
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#e0e0e0' : 'transparent')};
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  transform: ${({ isActive }) => (isActive ? 'scale(1.1)' : 'scale(1)')};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubHeaderItem = styled.span`
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
`;

const EditIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  margin-left: 5px;
  cursor: pointer;
`;

const EditLogo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%; 
  border: 2px solid #DBDBDB; 
  padding: 2px; 
  transition: transform 0.3s;

  &:hover {
    transform: rotate(20deg); 
  }
`;

const SaveButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  text-align: center;
`;

export default SubHeader;
