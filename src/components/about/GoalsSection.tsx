import Goal from './Goal';

interface Goal {
  id: number;
  icon: string;
  title: string;
  emphasis: string;
  description: string;
}

const goals: Goal[] = [
  {
    id: 1,
    icon: 'Vote',
    title: 'Practical',
    emphasis: 'Education',
    description:
      'Equipping individuals with knowledge to empowers individuals to make meaningful changes in their communities and environment.',
  },
  {
    id: 2,
    icon: 'Brain',
    title: 'Community',
    emphasis: 'Engagement',
    description:
      'Encouraging active participation and collaboration within communities, fostering a sense of responsibility and unity in our society.',
  },
  {
    id: 3,
    icon: 'Food',
    title: 'Inspiring For',
    emphasis: 'Change',
    description:
      'Motivating individuals to take action and create positive changes in their communities and environment.',
  },
];

function GoalsSection() {
  return (
    <div className="bg-orange-200 ">
      <h2 className="text-5xl md:text-7xl text-pistachio text-center font-bold font-league-spartan pt-12">
        OUR GOALS
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center p-8 md:p-12 font-league-spartan gap-8">
        {goals.map((goal, index) => (
          <div key={goal.id}>
            <Goal
              icon={goal.icon}
              title={goal.title}
              emphasis={goal.emphasis}
              description={goal.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalsSection;
