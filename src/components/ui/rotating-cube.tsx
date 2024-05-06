import React from 'react';
// import './styles.css'; // Import the CSS file

import { PiGraphLight } from 'react-icons/pi';
import { GiGears } from 'react-icons/gi';
import { GrGraphQl } from 'react-icons/gr';
// import { FaGithub, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';

const RotatingCubes: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="cube-wrapper">
        <div className="cube cube1 animate-orbit1"
        // href="https://www.linkedin.com/in/sahil-sahu-542a55240/"
        target="_blank"
        rel="noreferrer">
          <div className="cube__face cube__face--front bg-black">
            <PiGraphLight className='w-full h-full text-blue-500 ' />
          </div>
          <div className="cube__face cube__face--back bg-black">
                        <PiGraphLight className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--right bg-black">
                         <PiGraphLight className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--left bg-black">
                                 <PiGraphLight className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--top bg-black">
                              <PiGraphLight className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--bottom bg-black">
                                <PiGraphLight className='w-full h-full text-blue-500' />


          </div>
        </div>
        <div className="cube cube2 animate-orbit2"
        // href="https://twitter.com/sahil110802"
        target="_blank"
        rel="noreferrer">
          <div className="cube__face cube__face--front bg-black"
          >
            <GiGears className='w-full h-full text-blue-500'/>
          </div>
          <div className="cube__face cube__face--back bg-black">
            <GiGears className='w-full h-full text-blue-500'/>


          </div>
          <div className="cube__face cube__face--right bg-black">
                <GiGears className='w-full h-full text-blue-500'/>


          </div>
          <div className="cube__face cube__face--left bg-black">
                   <GiGears className='w-full h-full text-blue-500'/>


          </div>
          <div className="cube__face cube__face--top bg-black">
                   <GiGears className='w-full h-full text-blue-500'/>


          </div>
          <div className="cube__face cube__face--bottom bg-black">
                <GiGears className='w-full h-full text-blue-500'/>


          </div>
        </div>
        <div className="cube cube3 animate-orbit3"
        // href="https://github.com/sahil110802"
        target="_blank"
        rel="noreferrer">
          <div className="cube__face cube__face--front bg-black">
            <GrGraphQl className='w-full h-full text-blue-500' />

          </div>
          <div className="cube__face cube__face--back bg-black">
                        <GrGraphQl className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--right bg-black">
               <GrGraphQl className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--left bg-black">
            <GrGraphQl className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--top bg-black">
                <GrGraphQl className='w-full h-full text-blue-500' />


          </div>
          <div className="cube__face cube__face--bottom bg-black">
              <GrGraphQl className='w-full h-full text-blue-500' />


          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingCubes;
