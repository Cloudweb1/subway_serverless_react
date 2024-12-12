import { MdSignalCellularAlt1Bar, MdSignalCellularAlt2Bar, MdSignalCellularAlt } from 'react-icons/md';
import { FaSignal } from 'react-icons/fa';

export default function CongestionInfo({ congestion }) {
  // TODO undefined 처리
  return (
    <>
      {congestion < 33.3 ? (
        <MdSignalCellularAlt1Bar size="25" color="green" />
      ) : congestion < 66.6 ? (
        <MdSignalCellularAlt2Bar size="25" color="gold" />
      ) : congestion < 100 ? (
        <MdSignalCellularAlt size="25" color="orange" />
      ) : (
        <FaSignal size="25" color="red" />
      )}
    </>
  );
}
