import { TeamMember } from '@/utils/local-data-types';

export const coreTeam: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO',
    image: '/logo.png',
    bio: 'John is the CEO of the company and has over 10 years of experience in the industry.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    image: '/logo.png', //'/team/core/jane_smith.jpg',
    bio: 'Jane is the CTO and leads the technology team.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    role: 'CFO',
    image: '/logo.png',
    bio: "Alice is the CFO and manages the company's finances.",
  },
];

export const marketingTeam: TeamMember[] = [
  {
    id: 4,
    name: 'Bob Brown',
    role: 'Marketing Manager',
    image: '/logo.png',
    bio: 'Bob is the Marketing Manager and oversees all marketing activities.',
  },
  {
    id: 5,
    name: 'Charlie Green',
    role: 'Social Media Specialist',
    image: '/logo.png',
    bio: "Charlie is the Social Media Specialist and manages the company's social media accounts.",
  },
];
