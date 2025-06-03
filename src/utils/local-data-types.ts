export interface TeamMember {
  id: number;
  name: string;
  role: string;
  pronouns: string;
  image?: string;
  bio: string;
}

export const teamTypes: string[] = [
  'Directors',
  'Internal',
  'External',
  'Marketing',
];
