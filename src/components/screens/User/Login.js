import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../../assets/images/logo.png';
import { UserContext } from '../../context/Store';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username, password };

    fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.data || 'Login failed') });
      }
      return response.json();
    })
    .then(data => {
      if (data.status_code === 6000) {
        localStorage.setItem('authToken', data.data.access);
        localStorage.setItem('refreshToken', data.data.refresh); 
        localStorage.setItem('userRole', data.role); 
        dispatch({ type: "LOGIN", payload: data.data });
        navigate('/'); 
      } else {
        setErrorMessage('Login failed. Please check your username and password.');
      }
    })
    .catch(error => {
      setErrorMessage(error.message || 'Something went wrong');
    });
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <LoginMainContainer>
      <Helmet><title>Login</title></Helmet>
      <MainLogoContainer>
        <MainLogo src={LogoImage} alt="Logo" />
      </MainLogoContainer>
      <LoginItemContainer>
        <LoginForm onSubmit={handleLogin}>
          <Title>Login</Title>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <SignUpText onClick={handleSignUpRedirect}>
            If you don't have an account, click here to sign up
          </SignUpText>
        </LoginForm>
      </LoginItemContainer>
    </LoginMainContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const LoginMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const MainLogoContainer = styled.div`
  width: 150px;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const MainLogo = styled.img`
  width: 100%;
  display: block;
`;

const LoginItemContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.7s ease-in-out;
  width: 600px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    outline: none;
  }
  transition: border-color 0.3s, box-shadow 0.3s;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  transition: background-color 0.3s;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const SignUpText = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  text-align: center;
`;

export default Login;
