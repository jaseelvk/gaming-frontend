import React, {  useState } from "react";
import styled, { keyframes } from "styled-components";
import {  useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import LogoImage from "../../../assets/images/logo.png";
import EyeOpen from "../../../assets/images/eyeOpen.svg";
import EyeClose from "../../../assets/images/eyeClose.svg";


function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.role = role;

    const usernameRegex = /^[a-zA-Z0-9@./+/_-]+$/;
    if (!usernameRegex.test(data.username)) {
      setErrorMessage(
        "Username can only contain letters, numbers, and @/./+/-/_ characters."
      );
      return;
    }

    fetch("http://127.0.0.1:8000/api/v1/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.data || "Registration failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.status_code === 6000) {
          localStorage.setItem("userRole", role);
          localStorage.setItem("authToken", data.data.access);
          localStorage.setItem("refreshToken", data.data.refresh);
          if (role === "admin") {
            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          setErrorMessage(data.message || "Sign up failed. Please try again.");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message || "Something went wrong");
      });
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    
    <SignupMainContainer>
      <Helmet><title>Signup</title></Helmet>
      <MainLogoContainer>
        <MainLogo src={LogoImage} alt="Logo" />
      </MainLogoContainer>
      <SignupItemContainer>
        <SignupForm onSubmit={handleSignUp}>
          <Title>Sign Up</Title>
          <Input type="text" name="username" placeholder="Username" required />
          <Input type="email" name="email" placeholder="Email" required />
          <PasswordContainer>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <PasswordToggleContainer onClick={togglePasswordVisibility}>
              <PasswordToggle
                src={showPassword ? EyeOpen : EyeClose}
                alt="Toggle Password"
              />
            </PasswordToggleContainer>
          </PasswordContainer>
          <RoleContainer>
            <RoleLabel>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </RoleLabel>
            <RoleLabel>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              Admin
            </RoleLabel>
          </RoleContainer>
          <Button type="submit">Sign Up</Button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <LoginText onClick={handleLoginRedirect}>
            If you have an account, login
          </LoginText>
        </SignupForm>
      </SignupItemContainer>
    </SignupMainContainer>
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

const inputFocus = keyframes`
  0% {
    border-color: #ccc;
    box-shadow: none;
  }
  100% {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }
`;

const buttonHover = keyframes`
  0% {
    background-color: #007bff;
  }
  100% {
    background-color: #0056b3;
  }
`;

const labelFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const SignupMainContainer = styled.div`
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

const SignupItemContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.7s ease-in-out;
  width: 600px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    animation: ${inputFocus} 0.3s forwards, ${pulse} 2s infinite;
    outline: none;
  }
  transition: border-color 0.3s, box-shadow 0.3s;
`;

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
`;

const PasswordToggleContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 45%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PasswordToggle = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const RoleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const RoleLabel = styled.label`
  animation: ${labelFadeIn} 1s ease-in-out;
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
    animation: ${buttonHover} 0.3s forwards, ${bounce} 1s;
  }
  transition: background-color 0.3s;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const LoginText = styled.p`
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
  animation: ${shake} 0.5s;
`;

export default SignUp;
