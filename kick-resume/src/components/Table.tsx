import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Briefcase, GraduationCap, Award, Zap } from "lucide-react";

type Candidate = {
  candidate_name: string;
  certifications: string[];
  education_level: string;
  key_skills_match: string[];
  keywords_found: number;
  relevance_score: number;
  years_of_experience: number;
};

export function TableDemo({
  tableData,
  loading,
}: {
  tableData: Candidate[];
  loading: boolean;
}) {
  const getScoreStyles = (score: number) => {
    if (score >= 80) return "bg-green-500/10 text-green-600 border-green-200";
    if (score >= 60) return "bg-orange-500/10 text-orange-600 border-orange-200";
    return "bg-red-500/10 text-red-600 border-red-200";
  };

  return (
    <div className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="hover:bg-transparent border-gray-100">
            <TableHead className="w-[200px] h-14 text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <User size={14} className="text-mySkyBlue" />
                Candidate
              </div>
            </TableHead>
            <TableHead className="text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-mySkyBlue" />
                Relevance
              </div>
            </TableHead>
            <TableHead className="text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-mySkyBlue" />
                Education
              </div>
            </TableHead>
            <TableHead className="text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-mySkyBlue" />
                Key Skills
              </div>
            </TableHead>
            <TableHead className="text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-mySkyBlue" />
                Experience
              </div>
            </TableHead>
            <TableHead className="text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-mySkyBlue" />
                Certifications
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index} className="border-gray-50">
                <TableCell><Skeleton className="h-4 w-[120px] rounded-lg" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[60px] rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px] rounded-lg" /></TableCell>
                <TableCell><div className="flex gap-1"><Skeleton className="h-5 w-[60px] rounded-md" /><Skeleton className="h-5 w-[80px] rounded-md" /></div></TableCell>
                <TableCell><Skeleton className="h-4 w-[40px] rounded-lg" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[100px] rounded-md" /></TableCell>
              </TableRow>
            ))
            : tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                  No data points available
                </TableCell>
              </TableRow>
            ) : tableData.map((candidate: Candidate, index: number) => (
              <TableRow key={index} className="group hover:bg-mySkyBlue/[0.02] border-gray-50 transition-colors">
                <TableCell className="py-4">
                  <span className="font-black text-gray-900 group-hover:text-mySkyBlue transition-colors">{candidate.candidate_name}</span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-black border ${getScoreStyles(candidate.relevance_score)}`}>
                    {candidate.relevance_score}%
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-bold text-gray-600">{candidate.education_level}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                    {candidate.key_skills_match.slice(0, 4).map((item: string, itemIndex: number) => (
                      <span
                        key={`${item}-skill-${itemIndex}`}
                        className="text-[10px] font-black uppercase tracking-tighter bg-gray-50 text-gray-500 border border-gray-100 rounded-md px-2 py-0.5 group-hover:border-mySkyBlue/30 group-hover:bg-white transition-all"
                      >
                        {item}
                      </span>
                    ))}
                    {candidate.key_skills_match.length > 4 && (
                      <span className="text-[10px] font-black text-gray-300">+{candidate.key_skills_match.length - 4} more</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-black text-gray-700">{candidate.years_of_experience}y</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.certifications.length > 0 ? (
                      candidate.certifications.slice(0, 2).map((item: string, itemIndex: number) => (
                        <span
                          key={`${item}-cert-${itemIndex}`}
                          className="text-[10px] font-black uppercase tracking-tighter bg-blue-50 text-mySkyBlue border border-blue-100 rounded-md px-2 py-0.5"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">N/A</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      
      {!loading && tableData.length > 0 && (
        <div className="bg-gray-50/50 p-6 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-400">
              <User size={14} />
            </div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Candidates Analyzed</span>
          </div>
          <span className="text-lg font-black text-gray-900">{tableData.length}</span>
        </div>
      )}
    </div>
  );
}
