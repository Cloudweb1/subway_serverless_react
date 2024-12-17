export default function ArrivalText({ align, arriveTime, secondText }) {
  const alignment = {
    left: { left: '63%' },
    right: { right: '63%' },
  };

  const className = `${secondText ? 'secondEta' : ''} eta`;

  return <p className={className} style={alignment[align]}>{`${arriveTime} 도착 예정`}</p>;
}
