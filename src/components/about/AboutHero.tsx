function AboutHero() {
  return (
    <div className="relative h-screen bg-[url(/assets/hero.png)] bg-cover bg-center">
      {/* Text with higher z-index */}
      <div className="relative z-10 flex flex-col justify-around h-full p-8">
        <h1 className="text-7xl md:text-8xl font-bold text-pistachio font-league-spartan">
          OUR MISSION
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-pistachio font-league-spartan">
          &quot;Promoting and inspiring growth in our community through
          education.&quot;
        </h2>
      </div>
      {/* White opacity overlay */}
      <div className="absolute inset-0 bg-cream opacity-80 z-0"></div>
    </div>
  );
}
export default AboutHero;
