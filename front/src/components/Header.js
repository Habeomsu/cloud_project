import axios from 'axios';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        '/auth/logout',
        {},
        { withCredentials: true },
      );
      console.log(response); // 서버 응답 확인
      setIsLoggedIn(false); // 로그아웃 후 로그인 상태 변경
      navigate('/');
    } catch (error) {
      console.error(error); // 오류 출력
      alert('Logout failed');
    }
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          홈
        </Link>
        <Nav className="me-auto">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="nav-link">
                회원가입
              </Link>
              <Link to="/login" className="nav-link">
                로그인
              </Link>
            </>
          ) : (
            <Button variant="outline-light" onClick={handleLogout}>
              로그아웃
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
