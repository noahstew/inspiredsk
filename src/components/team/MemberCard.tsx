'use client';

// import { useState } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/utils/local-data-types';
// import { DIRECTORS, INTERNAL, EXTERNAL, MARKETING } from '@/data/team';

// const teamMap: Record<string, TeamMember[]> = {
//   Directors: DIRECTORS,
//   Internal: INTERNAL,
//   External: EXTERNAL,
//   Marketing: MARKETING,
// };

type MemberCardProps = {
  teamMember: TeamMember;
  index: number;
};

function MemberCard({ teamMember, index }: MemberCardProps) {
  return (
    <div
      className={`member-card relative w-[260px] h-[325px] mx-auto rounded-2xl opacity-0 translate-y-8 animate-fade-in-up`}
      style={{
        marginBottom: '0px',
        animationDelay: `${index * 120}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div className={`card-inner absolute w-full h-full`}>
        {/* Front */}
        <div className="card-front absolute w-full h-full bg-white rounded-2xl shadow-md flex flex-col items-stretch overflow-hidden [backface-visibility:hidden]">
          <div className="w-full h-[200px] min-h-[200px] bg-gradient-to-b from-peach-200 to-white rounded-t-2xl overflow-hidden relative flex-shrink-0 img-small">
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
          {/* this div here */}
          <div className="flex flex-col  justify-start items-center p-2 bg-white rounded-b-2xl text-center">
            <h3 className="text-xl font-bold text-persimmon ">
              {teamMember.name}
            </h3>
            <span className="text-pistachio">{teamMember.pronouns}</span>
            <p className="text-base font-medium text-olive ">
              {teamMember.role}
            </p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
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
            height: 350px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 0 !important;
          }
          .img-small {
            height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MemberCard;
