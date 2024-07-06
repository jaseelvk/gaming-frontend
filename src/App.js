// File: /App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StoreProvider, useStore } from './components/context/Store';
import AuthStack from './components/routing/AuthStack';
import HomeStack from './components/routing/HomeStack';

function App() {
  return (
    <StoreProvider>
      <Router>
        <AppRouter />
      </Router>
    </StoreProvider>
  );
}

function AppRouter() {
  const { userData, loading } = useStore();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path="/*" element={userData?.access ? <HomeStack /> : <AuthStack />} />
    </Routes>
  );
}

export default App;
