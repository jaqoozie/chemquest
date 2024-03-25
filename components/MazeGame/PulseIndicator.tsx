import PulseDot from 'react-pulse-dot';
import 'react-pulse-dot/dist/index.css';

export interface PulseIndicatorProps {
  color: string;
  text: string;
}

const PulseIndicator: React.FC<PulseIndicatorProps> = ({ color, text }) => {
  return (
    <>
      <PulseDot color={color} />
      <p>{text}</p>
    </>
  );
};

export default PulseIndicator;
