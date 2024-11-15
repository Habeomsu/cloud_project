import React, { useEffect, useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const MusicItem = (props) => {
  const { track_name, artist, album, albumImage_url, preview_url } =
    props.music;
  const [audio] = useState(new Audio(preview_url)); // 미리듣기 URL을 Audio 객체로 설정
  const [isPlaying, setIsPlaying] = useState(false); // 오디오 재생 상태
  const [progress, setProgress] = useState(0); // 프로그레스 바 상태
  const [isLoaded, setIsLoaded] = useState(false); // 오디오 로딩 상태

  useEffect(() => {
    // 오디오가 로드되었을 때
    audio.onloadeddata = () => {
      setIsLoaded(true);
    };

    // 오디오의 onTimeUpdate 이벤트로 프로그레스 바 업데이트
    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    // 오디오가 끝났을 때 상태 변경
    audio.onended = () => {
      setIsPlaying(false); // 오디오가 종료되면 재생 상태 변경
      setProgress(0); // 프로그레스 바 초기화
      audio.currentTime = 0; // 오디오의 위치를 처음으로 설정
    };

    // 컴포넌트 언마운트 시 오디오 정리
    return () => {
      audio.pause();
      setProgress(0);
      audio.currentTime = 0; // 언마운트 시 오디오 위치 초기화
    };
  }, [audio]);

  const handlePlay = () => {
    if (isPlaying) {
      audio.pause(); // 이미 재생 중이면 정지
      setIsPlaying(false); // 상태를 false로 업데이트
    } else {
      audio.play(); // 오디오 재생 시작
      setIsPlaying(true); // 상태를 true로 업데이트
    }
  };

  // ProgressBar 클릭으로 재생 위치 변경
  const handleProgressBarClick = (e) => {
    if (audio.duration) {
      const clickX = e.nativeEvent.offsetX;
      const progressBarWidth = e.target.clientWidth;
      const newTime = (clickX / progressBarWidth) * audio.duration;
      audio.currentTime = newTime; // 오디오 재생 위치 설정
      setProgress((newTime / audio.duration) * 100); // 프로그레스 바 업데이트
    }
  };

  return (
    <Card
      className="mb-3"
      style={{
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '10px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: '0 0 150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10px',
          }}
        >
          <img
            src={albumImage_url}
            alt={track_name}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'contain',
              borderRadius: '15px',
            }}
          />
        </div>

        <div
          style={{
            padding: '15px',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Card.Body>
            <Card.Title>{track_name}</Card.Title>
            <Card.Text>
              <strong>Artist:</strong> {artist} <br />
              <strong>Album:</strong> {album}
            </Card.Text>
          </Card.Body>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              justifyContent: 'flex-end', // 오른쪽 정렬
            }}
          >
            <button onClick={handlePlay} style={{ marginRight: '10px' }}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div
              style={{ flex: 1, marginLeft: '10px' }}
              onClick={handleProgressBarClick}
            >
              <ProgressBar
                now={progress}
                label={isLoaded ? `${Math.round(progress)}%` : 'Loading...'}
                animated={!isLoaded} // 로딩 중일 때 애니메이션
                variant="info"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MusicItem;
