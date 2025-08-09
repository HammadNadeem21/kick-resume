// 'use client';
// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { motion } from 'framer-motion';

// const COLORS = ['#22c55e', '#E5E7EB']; // Blue = score, Gray = remaining

// const SectionScoreChart = ({ score }: { score: number | null }) => {
//   // Ensure score is a valid number between 0 and 100
//   const safeScore = typeof score === 'number' && !isNaN(score) && score >= 0 && score <= 100 ? score : 0;
//   const data = [
//     { name: 'Score', value: safeScore },
//     { name: 'Remaining', value: 100 - safeScore },
//   ];

//   return (
//     <motion.div
//       className="relative w-[150px] h-[150px] hover:scale-105 transition-transform"
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius="60%"
//             outerRadius="80%"
//             dataKey="value"
//             startAngle={90}
//             endAngle={-270}
//             stroke="none"
//             isAnimationActive
//           >
//             {data.map((_, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-lg font-bold text-white">{safeScore} / 100</span>
//         <span className="text-xs text-white font-bold">ATS Score</span>
//       </div>
//     </motion.div>
//   );
// };

// export default SectionScoreChart;

"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const SectionScoreChart = ({
  score,
  textColor,
  scoreText,
}: {
  score: number | null;
  textColor: string;
  scoreText?: string;
}) => {
  const safeScore =
    typeof score === "number" && !isNaN(score) && score >= 0 && score <= 100
      ? score
      : 0;

  // Dynamic color based on score range
  const getScoreColor = (score: number) => {
    if (score < 50) return "#ef4444"; // Red
    if (score < 70) return "#facc15"; // Yellow
    return "#22c55e"; // Green
  };

  const COLORS = [getScoreColor(safeScore), "#E5E7EB"]; // Score color, then background

  const data = [
    { name: "Score", value: safeScore },
    { name: "Remaining", value: 100 - safeScore },
  ];

  return (
    <motion.div
      className="relative sm:w-[150px] w-[120px] sm:h-[150px] h-[120px] hover:scale-105 transition-transform"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="sm:text-[15px] text-[8px] font-bold"
          style={{ color: textColor }}
        >
          {safeScore} / 100
        </span>
        <span
          className="sm:text-[10px] text-[8px]  font-bold"
          style={{ color: textColor }}
        >
          {scoreText}
        </span>
      </div>
    </motion.div>
  );
};

export default SectionScoreChart;
