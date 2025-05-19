import { RiUserCommunityLine } from 'react-icons/ri';
import { GiTeamIdea } from 'react-icons/gi';
import { MdOutlineSchool } from 'react-icons/md';

interface GoalProps {
  icon: string;
  title: string;
  emphasis: string;
  description: string;
}

function Goal({ icon, title, emphasis, description }: GoalProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-white rounded-xl items-start md:items-center p-4 md:px-16 lg:px-24 ">
      {/* Icon section */}
      <div className="text-5xl md:text-6xl text-persimmon mr-6 md:mr-10 mb-4 md:mb-0 flex-shrink-0">
        {determineIcon(icon)}
      </div>

      {/* Title section */}
      <div className="mr-6 md:mr-10 mb-4 md:mb-0 flex-shrink-0 min-w-[160px]">
        <div className="text-2xl md:text-3xl font-league-spartan font-bold text-charcoal leading-tight">
          {title}
        </div>
        <div className="text-2xl md:text-3xl font-league-spartan font-bold text-pistachio leading-tight">
          {emphasis}
        </div>
      </div>

      {/* Vertical bar */}
      <div className="hidden md:block w-4 bg-pistachio h-24 mx-4"></div>

      {/* Description - visible on all screens */}
      <div className="text-base md:text-lg lg:text-xl text-olive max-w-2xl flex-grow">
        {description}
      </div>
    </div>
  );
}

export default Goal;

function determineIcon(icon: string) {
  switch (icon) {
    case 'Vote':
      return <MdOutlineSchool />;
    case 'Brain':
      return <RiUserCommunityLine />;
    case 'Food':
      return <GiTeamIdea />;
    default:
      return null;
  }
}
