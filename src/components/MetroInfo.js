import { useEffect, useState } from 'react';
import '../styles/MetroInfoPage.css';
import MetroBasicInfo from './MetroBasicInfo';
import http from '../http';
import MetroDetailedInfo from './MetroDetailedInfo';

export default function MetroInfo({ stationId, lineNumber, name }) {
  const [prevStationName, setPrevStationName] = useState('--');
  const [nextStationName, setNextStationName] = useState('--');

  const [isCongestionLoaded, setIsCongestionLoaded] = useState(false);
  const [upboundCongestions, setUpboundCongestions] = useState({});
  const [downboundCongestions, setDownboundCongestions] = useState({});

  const [isArrivalLoaded, setIsArrivalLoaded] = useState(false);
  const [upboundArrivals, setUpboundArrivals] = useState([]);
  const [downboundArrivals, setDownboundArrivals] = useState([]);

  // useEffect(function, []) 하면은 훅을 최초 한번만 돌릴수 있다(예를들어 데이터를 가져올때)
  useEffect(() => {
    async function fetchCongestions() {
      try {
        const response = await http.get(`/api/metro/stations/${encodeURIComponent(name)}/congestions`);
        const data = response.data.filter(datum => datum.lineNumber === lineNumber).pop();
        setUpboundCongestions(data.upDegree);
        setDownboundCongestions(data.downDegree);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
        setUpboundCongestions({ time: '--:--', degree: '0.0' });
        setDownboundCongestions({ time: '--:--', degree: '0.0' });
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
        const response = await http.get(`/api/metro/stations/${encodeURIComponent(name)}/arrivals`);
        const data = response.data;

        const upbound = [];
        const downbound = [];
        let prevStation = '';
        let nextStation = '';

        data.forEach(datum => {
          // 상행선은 이전역과 다음역이 반대여야함
          if (datum.lineNumber === parseInt(lineNumber) && datum.direction === '1') {
            upbound.push(datum);
            if (!prevStation) {
              prevStation = datum.nextStation;
            }
            if (!nextStation) {
              nextStation = datum.prevStation;
            }
          } else if (datum.lineNumber === parseInt(lineNumber) && datum.direction === '2') {
            downbound.push(datum);
            if (!prevStation) {
              prevStation = datum.prevStation;
            }
            if (!nextStation) {
              nextStation = datum.nextStation;
            }
          }
        });

        setUpboundArrivals(upbound);
        setDownboundArrivals(downbound);
        setPrevStationName(prevStation);
        setNextStationName(nextStation);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
        setUpboundArrivals([
          { arriveTime: '--:--', direction: '1', lineNumber, name, nextStation: '--', prevStation: '--' },
          { arriveTime: '--:--', direction: '1', lineNumber, name, nextStation: '--', prevStation: '--' },
        ]);
        setDownboundArrivals([
          { arriveTime: '--:--', direction: '2', lineNumber, name, nextStation: '--', prevStation: '--' },
          { arriveTime: '--:--', direction: '2', lineNumber, name, nextStation: '--', prevStation: '--' },
        ]);
        setPrevStationName('--');
        setNextStationName('--');
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
            arriveTimes={downboundArrivals.map(arrival => arrival.arriveTime)}
            congestion={downboundCongestions.degree}
            reverseImage
          />
          <MetroDetailedInfo
            stationName={nextStationName}
            align="right"
            arriveTimes={upboundArrivals.map(arrival => arrival.arriveTime)}
            congestion={upboundCongestions.degree}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
