import { FaSignal } from 'react-icons/fa';
import { MdSignalCellularAlt, MdSignalCellularAlt1Bar, MdSignalCellularAlt2Bar } from 'react-icons/md';
import { RiZzzFill } from 'react-icons/ri';

export default function CongestionInfo({ congestion }) {
  return (
    <>
      {congestion === 0 ? (
        <RiZzzFill />
      ) : congestion < 33.3 ? (
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
