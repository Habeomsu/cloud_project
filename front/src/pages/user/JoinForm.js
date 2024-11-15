import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      await axios.post('/auth/register', {
        username,
        password,
      });
      alert('회원가입 성공');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
};

export default JoinForm;
