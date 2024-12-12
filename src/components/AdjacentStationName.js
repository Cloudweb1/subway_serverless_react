export default function AdjacentStationName({ stationName, align }) {
  const alignment = {
    left: { left: '5%' },
    right: { right: '5%' },
  };

  return (
    <p className="adj" style={alignment[align]}>
      {stationName}
    </p>
  );
}
