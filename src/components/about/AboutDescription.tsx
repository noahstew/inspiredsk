import Image from 'next/image';

function AboutDescription() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-cream p-8 md:p-12 font-league-spartan ">
      <div className="md:w-1/2 pr-0 md:pr-8">
        <h2 className="text-5xl md:text-7xl text-peach font-bold mb-6">
          WHO WE ARE
        </h2>
        <p className="text-lg md:text-xl text-peach mb-6 ">
          InspirED aims to educate citizens in society to promote a better
          environment. We focus on fostering practical education rather than
          traditional academic education.
        </p>
        <p className="text-lg md:text-xl text-pistachio mb-6">
          A more educated society is a safer society where people are involved.
        </p>
        <p className="text-lg md:text-xl text-peach">
          We inspire by choosing monthly initiatives where we believe need
          change.
        </p>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <Image
          src="/assets/blood.png"
          alt="Team members holding donation signs"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
export default AboutDescription;
