import React from 'react';
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
function Testimonial() {
  const testimonials = [
    {
      title: "Helps to Conceptualize topics in an application level",
      desc: "I could vividly envision the mechanics behind various concepts, including Fleming's Thumb rules, the Hall effect, Lorentz Force, and numerous others. It has deeply enhanced my capacity to imagine and innovate.",
      name: "Sneha S",
      profession: "Student",
      country: "INDIA",
    },
    {
      title: "Enhancing Knowledge Retention with visual elements",
      desc: "What makes it particularly valuable is that the visualizations of fundamental concepts not only enhance my understanding but also contribute significantly to retaining knowledge in a more effective manner",
      name: "Avantika",
      profession: "Student",
      country: "INDIA",
    },
    {
      title: "Impactful pedagogy to foster curiosity among students",
      desc: "This online platform is very interactive and effective for teaching various concepts which are difficult to understand",
      name: "PAUL MALIAKKAL",
      profession: "Physics Teacher",
      country: "QATAR",
    },
  ];
  return (
    <div
      className="flex flex-col lg:mx-[70px] md:md:mx-[30px] mx-[14px]  md:mt-32 pt-16 gap-10"
      id="testimonials"
    >
      <h1 className="text-[#164F63] md:text-[54px] md:leading-none leading-9 text-[33px] w-full grotesk  text-center">
        WHAT OUR STUDENTS & EDUCATORS ARE SAYING
      </h1>
      {/* desktop */}
      <div className="md:flex hidden md:flex-row flex-col justify-center  md:gap-6 gap-18">
        {testimonials?.map((testimonial,index) => (
          <div key={index} className="md:w-[430px] rounded-xl border shadow-lg p-4 flex flex-col justify-between">
            <i className="fa-solid fa-quote-left"></i>
            <div className="ml-6">
              <h2 className="text-[#164F63] font-medium text-2xl">
                {testimonial.title}
              </h2>
              <p className=" text-sm mt-4">{`"${testimonial.desc}"`}</p>
            </div>
            <div className=" text-right text-[#164F63] font-bold text-sm mt-4">
              - {testimonial.name}, {testimonial.profession},{" "}
              {testimonial.country}
            </div>
          </div>
        ))}
      </div>
      {/* mobile */}
      <div className="w-full md:hidden flex justify-center items-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper flex justify-center items-center"
        >
          {testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial.title} className="flex mb-9 justify-center items-center mx-auto">
              <div className="md:w-[430px] h-[330px] rounded-xl border shadow-lg p-4 flex flex-col justify-between">
                {/* <Image src="/Quote.svg" alt="" width={27} height={20} /> */}
                <div className="ml-6">
                  <h2 className="text-[#164F63] font-medium text-2xl">
                    {testimonial.title}
                  </h2>
                  <p className=" text-sm mt-4">{`"${testimonial.desc}"`}</p>
                </div>
                <div className=" text-right text-[#164F63] font-bold text-sm mt-4">
                  - {testimonial.name}, {testimonial.profession},{" "}
                  {testimonial.country}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default Testimonial;
