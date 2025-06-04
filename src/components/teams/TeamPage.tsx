'use client';

import { useState } from 'react';
import { DIRECTORS, INTERNAL, EXTERNAL, MARKETING } from '@/data/team';
import { TeamMember } from '@/utils/local-data-types';
import { teamTypes } from '@/utils/local-data-types';
import MemberCard from './MemberCard';

function TeamPage() {
  const [selectedType, setSelectedType] = useState(teamTypes[0]);

  const teamMap: Record<string, TeamMember[]> = {
    Directors: DIRECTORS,
    Internal: INTERNAL,
    External: EXTERNAL,
    Marketing: MARKETING,
  };

  const currentTeam = teamMap[selectedType] || [];

  return (
    <div className="flex flex-col min-h-screen w-full bg-cream py-8">
      <div className="max-w-6xl w-full mx-auto px-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-olive">Our Team</h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 border-cream bg-white text-lg font-semibold text-persimmon shadow-sm focus:outline-none focus:ring-2 focus:ring-persimmon transition"
          >
            {teamTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full flex-1">
          {currentTeam.map((member) => (
            <MemberCard key={member.id} teamMember={member} />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 600px) {
          .member-card {
            width: 90vw !important;
            height: 340px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default TeamPage;
