import React from 'react';

const QuizPracticeSection = () => {
  const options = [
    { label: 'क', text: 'New York' },
    { label: 'ख', text: 'Geneva' },
    { label: 'ग', text: 'London' },
    { label: 'घ', text: 'Delhi' },
  ];

  const sectors = ['Administration', 'Education', 'Health', 'IT', 'Finance'];

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start font-sans">
      
      {/* Left Card: Question of the day */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative overflow-hidden flex pl-10">
        
        {/* Left Dashed Border / Pattern Accent */}
        <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-between py-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-400 rounded-xs" />
          ))}
        </div>

        <div className="flex-1 pl-4">
          {/* Tags */}
          <div className="flex items-center gap-3 text-xs mb-4">
            <span className="bg-sky-100 text-sky-800 font-semibold px-2.5 py-1 rounded-md">
              Question of the day
            </span>
            <span className="text-gray-500 font-medium">Health</span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-serif font-bold text-slate-800 leading-snug mb-6">
            The headquarters of the World Health Organization is in:
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {options.map((opt, index) => (
              <div key={index} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-sm font-semibold text-gray-700 group-hover:border-slate-800">
                  {opt.label}
                </span>
                <span className="text-gray-700 text-sm font-medium group-hover:text-slate-900">
                  {opt.text}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            View answer
          </button>
        </div>
      </div>

      {/* Right Section: Practise by sector */}
      <div className="pt-2">
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-3">
          Practise by sector
        </h2>
        
        <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">
          15 questions per quiz. Answer everything first, then see your score and every explanation.
        </p>

        {/* Sector Pills */}
        <div className="flex flex-wrap gap-2.5">
          {sectors.map((sector, index) => (
            <button
              key={index}
              className="px-5 py-2 rounded-full border border-gray-300 text-slate-800 font-bold text-sm hover:bg-slate-100 transition-colors"
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default QuizPracticeSection;