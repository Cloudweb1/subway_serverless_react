import { useEffect, useState } from 'react';
import http from '../http';
import '../styles/MetroInfoPage.css';
import MetroBasicInfo from './MetroBasicInfo';
import MetroDetailedInfo from './MetroDetailedInfo';

export default function MetroInfo({ stationId, lineNumber, name }) {
  const [prevStationName, setPrevStationName] = useState('이전역 없음');
  const [nextStationName, setNextStationName] = useState('다음역 없음');

  const [isCongestionLoaded, setIsCongestionLoaded] = useState(false);
  const [upboundCongestion, setUpboundCongestion] = useState(0);
  const [downboundCongestion, setDownboundCongestion] = useState(0);

  const [isArrivalLoaded, setIsArrivalLoaded] = useState(false);
  const [upboundArrivals, setUpboundArrivals] = useState([]);
  const [downboundArrivals, setDownboundArrivals] = useState([]);

  // useEffect(function, []) 하면은 훅을 최초 한번만 돌릴수 있다(예를들어 데이터를 가져올때)
  useEffect(() => {
    async function fetchCongestions() {
      try {
        const response = await http.get(`/api/metro/stations/${stationId}/congestions`);
        const data = response.data;
        setUpboundCongestion(data.upDegree);
        setDownboundCongestion(data.downDegree);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
      setIsCongestionLoaded(true);
    }

    if (!isCongestionLoaded) {
      fetchCongestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchArrivals() {
      try {
        const response = await http.get(`/api/metro/stations/${stationId}/arrivals`);
        const data = response.data;

        setPrevStationName(data.prevStation);
        setNextStationName(data.nextStation);
        setUpboundArrivals(data.arrivals.upbound);
        setDownboundArrivals(data.arrivals.downbound);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
      setIsArrivalLoaded(true);
    }

    if (!isArrivalLoaded) {
      fetchArrivals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="metroItem2">
      <MetroBasicInfo stationId={stationId} lineNumber={lineNumber} name={name} />
      {isCongestionLoaded && isArrivalLoaded ? (
        <>
          <MetroDetailedInfo
            stationName={prevStationName}
            align="left"
            arriveTimes={downboundArrivals}
            congestion={downboundCongestion}
            reverseImage
          />
          <MetroDetailedInfo
            stationName={nextStationName}
            align="right"
            arriveTimes={upboundArrivals}
            congestion={upboundCongestion}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
