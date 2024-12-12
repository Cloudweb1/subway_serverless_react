import subwayImg from '../assets/imgs/subway_paint.png';
import CongestionInfo from './CongestionInfo';
import '../styles/TrainIcon.css';

export default function TrainIcon({ align, arriveTime, congestion, reverse }) {
  const timecalc = arriveTime => {
    let currentMin = Number(new Date().getMinutes());
    let arriveMin = Number(arriveTime.slice(-2));

    if (isNaN(currentMin) || isNaN(arriveMin) || arriveMin - currentMin >= 9) return 0;
    else if (arriveMin - currentMin >= 0) {
      return 9 - (arriveMin - currentMin);
    } else {
      return 9 - (arriveMin - currentMin + 60);
    }
  };

  const scale = 5 + 3 * timecalc(arriveTime);
  const alignment = {
    left: { left: `${scale}%` },
    right: { right: `${scale}%` },
  };

  return (
    <div className="comingTrain" style={alignment[align]}>
      <CongestionInfo congestion={congestion} />
      <img src={subwayImg} alt="subway-locaion-icon-logo" className={`subway-image ${reverse ? 'reverse' : ''}`} />
    </div>
  );
}
