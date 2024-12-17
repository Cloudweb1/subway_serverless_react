import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../styles/MetroInfoPage.css';
import subway from '../assets/imgs/subway.png';
import MetroInfo from '../components/MetroInfo';

function MetroInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // stations가 empty 인 경우는 두가지가있어:
  // 1. 그냥 내주변에 역이없는거임
  // 2. navigate를 통해서 안넘어온거임
  // stations.length === 0 && isLoaded --> 내주변에 역이 없다!
  // stations.length === 0 && !isLoaded --> navigate를 통해서 안넘어온 잘못된 접근이다!
  const [stations, setStations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (location.state) {
      setIsLoaded(true);
      const stations = location.state.stations; // Station[] | undefined
      if (stations) {
        setStations(stations);
      }
    }
  }, [location]);

  //홈화면 이동
  const goHome = _event => {
    navigate('/');
  };

  return (
    <div className="metroInfo">
      <img src={subway} onClick={goHome} alt="app-main-logo" className="logo" />
      <div className="content">
        {isLoaded ? (
          stations.length === 0 ? (
            <div>주변에 역이 없습니다</div>
          ) : (
            stations.map((station, index) => (
              <MetroInfo key={index} stationId={station.id} lineNumber={station.line_number} name={station.name} />
            ))
          )
        ) : (
          <div>잘못된 접근입나다. 내 위치를 찾으시겠습니까?</div>
        )}
      </div>
    </div>
  );
}

export default MetroInfoPage;
