import Image from 'next/image';

function ImageBubble() {
  return (
    <div className="relative w-80 h-80">
      <div className="absolute inset-0 rounded-full bg-pistachio z-0 opacity-250" />
      <div className="absolute -top-36 -left-36 w-96 h-96 overflow-hidden rounded-full border-8 border-peach z-10">
        <Image
          src="/assets/donation.png"
          alt="Image with the team"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
export default ImageBubble;
