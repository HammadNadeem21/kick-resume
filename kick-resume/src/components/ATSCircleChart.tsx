// 'use client';
// import { PieChart, Pie, Cell } from 'recharts';

// const COLORS = ['#3B82F6', '#E5E7EB']; // Blue = score, Gray = remaining

// const ATSCircleChart = ({ score }: { score: number }) => {
//   const data = [
//     { name: 'Score', value: score },
//     { name: 'Remaining', value: 100 - score },
//   ];

//   return (
//     <div className="relative w-[180px] h-[180px] mx-auto">
//       <PieChart width={180} height={180}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={60}
//           outerRadius={80}
//           dataKey="value"
//           startAngle={90}
//           endAngle={-270}
//         >
//           {data.map((_, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//       </PieChart>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-xl font-bold text-blue-600">{score}%</span>
//       </div>
//     </div>
//   );
// };

// export default ATSCircleChart;

"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#55cef6", "#E5E7EB"]; // Blue = score, Gray = remaining

const ATSCircleChart = ({ score }: { score: number }) => {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  return (
    <motion.div
      className="relative w-[200px] h-[200px] hover:scale-105 transition-transform"
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
        <span className="text-xl font-bold text-mySkyBlue">{score} / 100</span>
        <span className="text-xs text-gray-600 font-bold">ATS Score</span>
      </div>
    </motion.div>
  );
};

export default ATSCircleChart;
