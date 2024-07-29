import React from 'react';

function VirtualClass() {
  const abouts = [
    {
      title: "Virtual Classroom",
      desc: "A digital space mirroring a traditional classroom, enriched with 3D simulations, fostering interactive and collaborative learning experiences.",
      img: "/images/virtual-classroom.jpg",
      align: "straight",
    },
    {
      title: "STEM Education",
      desc: "To enhance teaching and learning experiences, promoting innovation and efficiency in educational practices",
      img: "/images/STEM-education.jpg",
      align: "reverse",
    },
    {
      title: "Human Centric",
      desc: "Instantaneous, responsive educational platform for educators & students for a dynamic enriching learning experiences.",
      img: "/images/human-centric.jpg",
      align: "straight",
    },
  ];
  return (
    <div className=" lg:mx-[140px] md:mx-[20px] mx-[14px] md:mt-32 mt-16 flex flex-col items-center" id="about2">
      <h1 className="text-[#164F63] md:text-[54px] text-[25px] w-full grotesk  text-center">
        FUTURE-READY IMMERSIVE (STEM) EDUCATION
      </h1>
      <div className="md:mt-10 mt-10 flex flex-col md:gap-7 gap-14 w-full sm:w-8/12 md:w-full">
        {abouts?.map((about) => (
          <div
          key={about.img}
            className={`flex md:flex-row flex-col ${
              about.align === "reverse" ? " md:flex-row-reverse" : ""
            } md:items-center md:gap-7`}
          >
            <div className="lg:w-[820px] md:w-[800px]  w-full h-[210px] md:h-[190px] xl:h-[230px]">
            <img
              src={about?.img}
              alt={`${about?.title}`}
              width={300}
              height={150}
              className="w-full h-full rounded-2xl"
            />
            </div>
            
            <div>
              <h2 className="md:text-[40px] text-[30px] text-[#164F63] font-medium grotesk lg:pl-4 md:pl-2 pl-4">
                {about?.title}
              </h2>
              <p className=" leading-7 tracking-wide md:text-xl md:mt-3 mt-2 pl-4 text-left">
                {about?.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default VirtualClass;
