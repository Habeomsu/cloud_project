import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MusicItem from '../../components/MusicItem';

const Home = ({ isLoggedIn }) => {
  const [trackName, setTrackName] = useState(''); // 검색어 상태
  const [tracks, setTracks] = useState([]); // 검색된 음악 리스트
  const [error, setError] = useState(null); // 에러 상태

  // 트랙 검색 함수
  const handleSearchClick = async () => {
    if (!isLoggedIn) {
      alert('로그인해주세요');
    } else {
      try {
        const response = await axios.get('/api/search', {
          params: { trackName },
          withCredentials: true,
        });

        // 받은 데이터를 state에 저장
        setTracks(response.data);
        setError(null); // 에러 초기화
      } catch (err) {
        setError('음악 검색에 실패했습니다. 다시 시도해주세요.');
        setTracks([]); // 검색 실패 시 트랙 목록 초기화
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTracks([]); // 로그아웃 시 tracks 초기화
    }
  }, [isLoggedIn]);

  return (
    <div>
      <hr />
      <h1>범수의 음악검색 어플리케이션에 오신것을 환영합니다</h1>

      {/* 검색어 입력 */}
      <input
        type="text"
        value={trackName}
        onChange={(e) => setTrackName(e.target.value)}
        placeholder="음악 이름을 입력하세요"
      />

      {/* 음악 검색 버튼 */}
      <Button onClick={handleSearchClick} size="sm">
        음악 검색
      </Button>

      {/* 에러 메시지 출력 */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* 음악 검색 결과 출력 */}
      <div style={{ marginTop: '20px' }}>
        {' '}
        {/* 여백 추가 */}
        {tracks.map((music) => (
          <MusicItem key={music.trackId} music={music} />
        ))}
      </div>
    </div>
  );
};

export default Home;
