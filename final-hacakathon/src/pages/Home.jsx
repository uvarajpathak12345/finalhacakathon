import React from 'react';
import { ExpandableCardDemo } from './Expandable';


export default function Home() {
  return (
    <>
    <div className="bg-white text-black md:flex grid  items-center justify-center min-h-screen">
      {/* Text Section */}
      <div className="text-center max-w-2xl px-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Your health is an investment, not an expense.
        </h1>
        <p className="text-lg md:text-xl mt-4">
          This website provides comprehensive healthcare services to ensure your well-being.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-sm px-4">
        <img src="/heart.png" alt="Heart Image" className="w-full object-contain" />
      </div>
    </div>
    <div className='mb-16'>
    <ExpandableCardDemo></ExpandableCardDemo>
    </div>
    </>
  );
}
