import Initiative from './Initiative';

interface Initiative {
  id: number;
  icon: string;
  title: string;
}

const initiatives: Initiative[] = [
  {
    id: 1,
    icon: 'Vote',
    title: 'Voting Education',
  },
  {
    id: 2,
    icon: 'Brain',
    title: 'Mental Health Awareness',
  },
  {
    id: 3,
    icon: 'Food',
    title: 'Food Insecurity',
  },
  {
    id: 4,
    icon: 'Blood',
    title: 'Blood Donation',
  },
  {
    id: 5,
    icon: 'Fist',
    title: 'Feminism Empowerment',
  },
];

function RecentInitiatives() {
  return (
    <div className="bg-pistachio p-8 md:p-12 font-league-spartan">
      <h2 className="text-5xl md:text-7xl text-cream text-center font-bold mb-8 md:mb-12 font-league-spartan">
        RECENT INITIATIVES
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8 md:gap-4">
        {initiatives.map((initiative) => (
          <Initiative
            key={initiative.id}
            icon={initiative.icon}
            title={initiative.title}
          />
        ))}
      </div>
    </div>
  );
}
export default RecentInitiatives;
