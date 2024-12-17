import { useNavigate } from 'react-router-dom';
import '../styles/StartPage.css';
import http from '../http';
import { useEffect, useState } from 'react';

function StartPage() {
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState('INITIAL');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [stations, setStations] = useState([]);

  useEffect(() => {
    async function fetchData(latitude, longitude) {
      const response = await http.get('/api/metro/stations', {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      const data = response.data;
      setStations(data);
    }

    if (latitude !== 0 && longitude !== 0) {
      fetchData(latitude, longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (stations.length !== 0) {
      navigate('/metro', { state: { stations } });
    }
  }, [stations, navigate]);

  const handleClick = event => {
    //사용자 위치정보 가져오기
    event.preventDefault();
    setLoadState('LOADING');

    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        setLatitude(crd.latitude);
        setLongitude(crd.longitude);
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다.');
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div className="startPage">
      <button className="searchBtn" onClick={handleClick}>
        <div></div>
        <p>{loadState === 'INITIAL' ? '주변역 찾기' : '주변역 찾는 중...'}</p>
      </button>
    </div>
  );
}

export default StartPage;
