import { GiVote } from 'react-icons/gi';
import { PiBrainBold } from 'react-icons/pi';
import { PiForkKnifeBold } from 'react-icons/pi';
import { FaHandFist } from 'react-icons/fa6';
import { BiDonateBlood } from 'react-icons/bi';

interface InitiativeProps {
  icon: string;
  title: string;
}
function Initiative({ icon, title }: InitiativeProps) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-6xl text-pistachio mb-4 bg-cream rounded-full p-4 flex items-center justify-center w-32 h-32">
          {determineIcon(icon)}
        </div>
        <h3 className="text-xl font-bold text-cream text-center">{title}</h3>
      </div>
    </div>
  );
}
export default Initiative;

function determineIcon(title: string) {
  switch (title) {
    case 'Vote':
      return <GiVote />;
    case 'Brain':
      return <PiBrainBold />;
    case 'Food':
      return <PiForkKnifeBold />;
    case 'Fist':
      return <FaHandFist />;
    case 'Blood':
      return <BiDonateBlood />;
    default:
      return null;
  }
}
