import React from 'react';

const WhyEffectuall = () => {
    
    return (
        <>

            <div className="flex md:flex-row flex-col lg:mx-[140px] md:mx-[50px] mx-[12px] pt-4 gap-10" id="about">
                <div className="lg:w-5/12 md:w-5/12 flex flex-col gap-4 mt-8">
                    <h2 className="md:text-[54px] text-[25px] mb-4 text-[#164F63]">WHY EFFECTUALL</h2>
                    <p className="text-gray-600">
                        We introduce a teaching methodology that uses technology as access points for guiding learners in science & technology. The interactive features allow the educators and learners to interact with the immersive 3D environment and make the process of acquiring and sharing knowledge interesting and easier.
                    </p>
                    <div className="md:block flex justify-center md:mt-3">
                        <button className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 mt-4">Get Started</button>
                    </div>
                </div>

                <div className="md:w-7/12 w-full flex flex-col gap-6 md:mt-0 mt-6">
                    <div className="flex md:justify-start justify-between md:gap-6 gap-3">
                        <a href="#solutions" className="flex md:items-start items-center flex-col gap-4 md:w-[300px] w-1/2 hover:shadow-lg shadow-[#ffffff] p-2 cursor-pointer">

                            <div className="text-4xl mb-4">
                                <i className="fas fa-atom text-red-400"></i>
                            </div>

                            <h2 className=" md:text-2xl text-xl md:text-left text-center font-medium grotesk">3D Simulations</h2>
                            <p className="md:text-base text-xs md:text-left text-center font-normal">
                                Collection of all 3D interactive simulations from STEM topics of
                                K-12 Curriculum.
                            </p>
                        </a>


                        <a href="#contact" className="flex md:items-start items-center flex-col gap-4 md:w-[300px] w-1/2 hover:shadow-lg shadow-[#ffffff] p-2 cursor-pointer">

                            <div className="text-4xl mb-4">
                                <i className="fas fa-cogs text-blue-400"></i>
                            </div>

                            <h2 className=" md:text-2xl text-xl md:text-left text-center font-medium grotesk">
                                Tailor-Made Solutions
                            </h2>
                            <p className="md:text-base text-xs md:text-left text-center font-normal">
                                Streamline your Company&apos;s Training with 3D Scenarios.
                            </p>
                        </a>
                    </div>

                    <div className="flex md:justify-start justify-between md:gap-6 gap-3">
                        <a href="#contact" className="flex md:items-start items-center flex-col gap-4 md:w-[300px] w-1/2 hover:shadow-lg shadow-[#ffffff] p-2 cursor-pointer">
                            <div className="text-4xl mb-4">
                                <i className="fas fa-lightbulb text-green-400"></i>

                            </div>

                            <h2 className=" md:text-2xl text-xl md:text-left text-center font-medium grotesk">Innovational Projects</h2>
                            <p className="md:text-base text-xs md:text-left text-center font-normal">
                                Interact with immersive 3D environment to understand STEM concepts
                            </p>
                        </a>


                        <a href="#contact" className="flex md:items-start items-center flex-col gap-4 md:w-[300px] w-1/2 hover:shadow-lg shadow-[#ffffff] p-2 cursor-pointer">
                            <div className="text-4xl mb-4">
                                <i className="fas fa-project-diagram text-yellow-400"></i>

                            </div>


                            <h2 className=" md:text-2xl text-xl md:text-left text-center font-medium grotesk">Customized Projects</h2>
                            <p className="md:text-base text-xs md:text-left text-center font-normal">
                                Crafted projects for all type of learners, Reading/Writing
                                learners, Kinesthetic learners.
                            </p>
                        </a>
                    </div>
                </div>
            </div>
            {/* <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-[#164F63]">FUTURE-READY IMMERSIVE (STEM) EDUCATION</h2>
                        <p className="text-gray-600">
                            We introduce a teaching methodology that uses technology as access points for guiding learners in science & technology. The interactive features allow the educators and learners to interact with the immersive 3D environment and make the process of acquiring and sharing knowledge interesting and easier.
                        </p>
                        <button className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 mt-4">Get Started</button>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/4 p-4 flex">
                            <div className="bg-white p-6 rounded shadow-lg text-center flex flex-col flex-grow">
                                <div className="text-4xl mb-4">
                                    <i className="fas fa-atom text-red-400"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">3D Simulations</h3>
                                <p className="text-gray-600 flex-grow">Collection of all 3D interactive simulations from STEM topics of K-12 Curriculum.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 p-4 flex">
                            <div className="bg-white p-6 rounded shadow-lg text-center flex flex-col flex-grow">
                                <div className="text-4xl mb-4">
                                    <i className="fas fa-cogs text-blue-400"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Tailor-Made Solutions</h3>
                                <p className="text-gray-600 flex-grow">Streamline your Company’s Training with 3D Scenarios.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 p-4 flex">
                            <div className="bg-white p-6 rounded shadow-lg text-center flex flex-col flex-grow">
                                <div className="text-4xl mb-4">
                                    <i className="fas fa-lightbulb text-green-400"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Innovational Projects</h3>
                                <p className="text-gray-600 flex-grow">Interact with immersive 3D environment to understand STEM concepts.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 p-4 flex">
                            <div className="bg-white p-6 rounded shadow-lg text-center flex flex-col flex-grow">
                                <div className="text-4xl mb-4">
                                    <i className="fas fa-project-diagram text-yellow-400"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Customized Projects</h3>
                                <p className="text-gray-600 flex-grow">Crafted projects for all type of learners, Reading/Writing learners, Kinesthetic learners.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default WhyEffectuall;
