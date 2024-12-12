import lineColor from '../styles/lineColor';

export default function MetroBasicInfo({ stationId, lineNumber, name }) {
  return (
    <>
      <div className="line" style={{ backgroundColor: `${lineColor[lineNumber]}` }} />
      <div className="stationFrame" style={{ border: `3px ${lineColor[lineNumber]} solid` }}>
        <div className="stationId" style={{ backgroundColor: `${lineColor[lineNumber]}` }}>
          {stationId}
        </div>
        <p className="stationName">{name}</p>
      </div>
    </>
  );
}
