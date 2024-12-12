import AdjacentStationName from './AdjacentStationName';
import TrainIcon from './TrainIcon';
import ArrivalText from './ArrivalText';

export default function MetroDetailedInfo({ stationName, align, arriveTimes, congestion, reverseImage }) {
  const [firstArriveTime, secondArriveTime] = arriveTimes;
  return (
    <>
      <AdjacentStationName stationName={stationName} align={align} />
      <TrainIcon
        align={align}
        arriveTime={firstArriveTime ? firstArriveTime : '--:--'}
        congestion={congestion}
        reverse={reverseImage}
      />
      <ArrivalText
        align={align === 'left' ? 'right' : 'left'}
        arriveTime={firstArriveTime ? firstArriveTime : '--:--'}
      />
      <ArrivalText
        align={align === 'left' ? 'right' : 'left'}
        arriveTime={secondArriveTime ? secondArriveTime : '--:--'}
        secondText
      />
    </>
  );
}
