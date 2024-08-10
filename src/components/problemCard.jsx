import React, { useState } from 'react';
import problems from '../assets/problems.json';

function Problemcard({ problem, index }) {
    let X = problem;
    let alphabet = ['A', 'B', 'C', 'D', 'E'];
    const [outlineShow, setOutlineShow] = useState("");

    return (
        <div className="container text-black w-full mx-auto px-8 py-2 mb-3  ">
            <div className="shadow-lg rounded-lg p-4">
                {problems.filter(problem => problem.id === X).map((A) => {
                    return (
                        <a key={X}>
                            <span className="-ml-16 p-2 rounded shadow-lg"> Question No.{index + 1}</span>
                            <span>
                                {A.Problem.map((s) => (
                                    <div key={s.id}>
                                        <li dangerouslySetInnerHTML={{ __html: s.Question }} className='text-sm font-bold py-8 list-none text-left' />
                                        {s.Choice.map((choice, index) =>
                                            <div className='text-sm font-semibold flex flex-wrap text-left' key={choice}>
                                                <span className='w-1/8'>{alphabet[index]}.</span>
                                                <span className='w-7/8 pl-8'>
                                                    <li dangerouslySetInnerHTML={{ __html: choice }} className='list-none' />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </span>
                            <hr className="my-4 md:min-w-full" />
                        </a>
                    );
                })}
            </div>
            <div className="flex justify-center mt-3">
                <a href="/simulations">
                    <button className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 mt-4">Simulations</button>
                </a>
            </div>
        </div>
    );
}

export default Problemcard;