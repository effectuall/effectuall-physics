import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const subjects = {
  "Physics": {
    "topics": [
      {
        "name": "Motion",
        "subtopics": [
          { name: "Types of Motion", url: "/physics/motion/types-of-motion" },
          { name: "Speed and Velocity", url: "/physics/motion/speed-and-velocity" },
          { name: "Acceleration", url: "/physics/motion/acceleration" },
          { name: "Graphical Representation of Motion", url: "/physics/motion/graphical-representation" }
        ]
      },
      {
        "name": "Force and Pressure",
        "subtopics": [
          { name: "Introduction to Force", url: "/physics/force/introduction" },
          { name: "Types of Forces", url: "/physics/force/types-of-forces" },
          { name: "Pressure", url: "/physics/force/pressure" },
          { name: "Pressure in Fluids", url: "/physics/force/pressure-in-fluids" }
        ]
      },
      {
        "name": "Energy",
        "subtopics": [
          { name: "Types of Energy", url: "/physics/energy/types" },
          { name: "Kinetic and Potential Energy", url: "/physics/energy/kinetic-potential" },
          { name: "Law of Conservation of Energy", url: "/physics/energy/conservation" },
          { name: "Work and Energy Relationship", url: "/physics/energy/work-energy" }
        ]
      }
    ]
  },
  "Chemistry": {
    "topics": [
      {
        "name": "Matter",
        "subtopics": [
          { name: "States of Matter", url: "/chemistry/matter/states" },
          { name: "Properties of Matter", url: "/chemistry/matter/properties" },
          { name: "Changes in Matter", url: "/chemistry/matter/changes" },
          { name: "Mixtures and Compounds", url: "/chemistry/matter/mixtures-compounds" }
        ]
      },
      {
        "name": "Elements and Compounds",
        "subtopics": [
          { name: "Introduction to Elements", url: "/chemistry/elements/introduction" },
          { name: "Chemical Symbols", url: "/chemistry/elements/symbols" },
          { name: "Compounds and Mixtures", url: "/chemistry/elements/compounds-mixtures" },
          { name: "Separation of Mixtures", url: "/chemistry/elements/separation" }
        ]
      },
      {
        "name": "Chemical Reactions",
        "subtopics": [
          { name: "Types of Chemical Reactions", url: "/chemistry/reactions/types" },
          { name: "Balancing Chemical Equations", url: "/chemistry/reactions/balancing" },
          { name: "Factors Affecting Chemical Reactions", url: "/chemistry/reactions/factors" },
          { name: "Energy Changes in Chemical Reactions", url: "/chemistry/reactions/energy-changes" }
        ]
      }
    ]
  },
  "Mathematics": {
    "topics": [
      {
        "name": "Number System",
        "subtopics": [
          { name: "Natural Numbers", url: "/math/number-system/natural" },
          { name: "Whole Numbers", url: "/math/number-system/whole" },
          { name: "Integers", url: "/math/number-system/integers" },
          { name: "Rational and Irrational Numbers", url: "/math/number-system/rational-irrational" }
        ]
      },
      {
        "name": "Algebra",
        "subtopics": [
          { name: "Introduction to Algebra", url: "/math/algebra/introduction" },
          { name: "Linear Equations", url: "/math/algebra/linear-equations" },
          { name: "Polynomials", url: "/math/algebra/polynomials" },
          { name: "Quadratic Equations", url: "/math/algebra/quadratic-equations" }
        ]
      },
      {
        "name": "Geometry",
        "subtopics": [
          { name: "Basic Geometric Shapes", url: "/math/geometry/shapes" },
          { name: "Triangles and Their Properties", url: "/math/geometry/triangles" },
          { name: "Circles", url: "/math/geometry/circles" },
          { name: "Coordinate Geometry", url: "/math/geometry/coordinate-geometry" }
        ]
      }
    ]
  },
  "Biology": {
    "topics": [
      {
        "name": "Cell - Structure and Functions",
        "subtopics": [
          { name: "Introduction to Cells", url: "/biology/cell/introduction" },
          { name: "Cell Organelles", url: "/biology/cell/organelles" },
          { name: "Cell Division", url: "/biology/cell/division" },
          { name: "Prokaryotic and Eukaryotic Cells", url: "/biology/cell/prokaryotic-eukaryotic" }
        ]
      },
      {
        "name": "Microorganisms",
        "subtopics": [
          { name: "Types of Microorganisms", url: "/biology/microorganisms/types" },
          { name: "Useful Microorganisms", url: "/biology/microorganisms/useful" },
          { name: "Harmful Microorganisms", url: "/biology/microorganisms/harmful" },
          { name: "Control of Microorganisms", url: "/biology/microorganisms/control" }
        ]
      },
      {
        "name": "Human Body",
        "subtopics": [
          { name: "Organ Systems", url: "/biology/human-body/systems" },
          { name: "Digestive System", url: "/biology/human-body/digestive" },
          { name: "Respiratory System", url: "/biology/human-body/respiratory" },
          { name: "Circulatory System", url: "/biology/human-body/circulatory" }
        ]
      }
    ]
  }
};

const Subjects = () => {
  const [activeSubject, setActiveSubject] = useState(null);

  const toggleSubject = (subject) => {
    setActiveSubject(activeSubject === subject ? null : subject);
  };

  return (
    <div className="container mx-auto p-4">
      {Object.keys(subjects).map((subject) => (
        <div key={subject} className="mb-4">
          <button
            onClick={() => toggleSubject(subject)}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full text-left"
          >
            {subject}
          </button>
          {activeSubject === subject && (
            <div className="mt-2 bg-gray-100 p-4 rounded shadow-md">
              {subjects[subject].topics.map((topic) => (
                <div key={topic.name} className="mb-2">
                  <h3 className="font-bold">{topic.name}</h3>
                  <ul className="list-disc ml-5">
                    {topic.subtopics.map((subtopic) => (
                      <li key={subtopic.name}>
                        <Link to={subtopic.url}>{subtopic.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Subjects;
