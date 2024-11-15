import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import JoinForm from './pages/user/JoinForm';
import LoginForm from './pages/user/LoginForm';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Home from './pages/music/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/register" element={<JoinForm />} />
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
