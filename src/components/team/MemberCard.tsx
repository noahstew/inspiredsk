'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/utils/local-data-types';

type MemberCardProps = {
  teamMember: TeamMember;
};

function MemberCard({ teamMember }: MemberCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div
      className={`member-card relative w-[260px] h-[340px] mx-auto rounded-2xl bg-transparent transition-shadow duration-200 cursor-pointer perspective-1000
        ${flipped ? '' : 'shadow-lg'}
      `}
      style={{
        marginBottom: '0px',
      }}
      onClick={handleFlip}
    >
      <div
        className={`card-inner absolute w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="card-front absolute w-full h-full bg-white rounded-2xl shadow-md flex flex-col items-stretch overflow-hidden [backface-visibility:hidden]">
          <div className="w-full h-[180px] bg-gradient-to-b from-peach-200 to-white rounded-t-2xl overflow-hidden relative flex-shrink-0">
            <Image
              src={teamMember.image || '/logo.png'}
              alt={teamMember.name}
              fill
              className="object-cover w-full h-full rounded-t-2xl"
              sizes="260px"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }}
            />
          </div>
          <div className="flex flex-col flex-1 justify-start items-center px-4 pt-5 bg-white rounded-b-2xl text-center">
            <h3 className="text-xl font-bold text-persimmon mb-1">
              {teamMember.name}
            </h3>
            <p className="text-base font-medium text-pistachio">
              {teamMember.role}
            </p>
          </div>
        </div>
        {/* Back */}
        <div className="card-back absolute w-full h-full bg-gradient-to-b from-[#fff7f0] to-peach-200 rounded-2xl flex flex-col items-center justify-center px-8 py-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h4 className="text-lg font-bold text-olive mb-4">
            {teamMember.name}
          </h4>
          <p className="text-base text-pistachio leading-relaxed">
            {teamMember.bio}
          </p>
        </div>
      </div>
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .from-peach-200 {
          --tw-gradient-from: #ffdab9;
          --tw-gradient-stops: var(--tw-gradient-from),
            var(--tw-gradient-to, rgba(255, 218, 185, 0));
        }
        .to-peach-200 {
          --tw-gradient-to: #ffdab9;
        }
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

export default MemberCard;
