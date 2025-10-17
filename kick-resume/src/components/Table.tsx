// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

// export function TableDemo({ data }: { data: any }) {
//   return (
//     <Table>
//       <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Invoice</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Method</TableHead>
//           <TableHead className="text-right">Amount</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data.map((invoice: any, index: number) => (
//           <TableRow key={index}>
//             <TableCell className="font-medium">{invoice.invoice}</TableCell>
//             <TableCell>{invoice.paymentStatus}</TableCell>
//             <TableCell>{invoice.paymentMethod}</TableCell>
//             <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={3}>Total</TableCell>
//           <TableCell className="text-right">$2,500.00</TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   );
// }

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
  return (
    <Table>
      <TableCaption>A list of candidates resumes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead>Relevance Score</TableHead>
          <TableHead>Education</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Experience (yrs)</TableHead>

          <TableHead className="">Certifications</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[40px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[50px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px]" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
            </TableRow>
          ))
          : tableData.map((candidate: Candidate, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {candidate.candidate_name}
              </TableCell>
              <TableCell className="">{candidate.relevance_score}%</TableCell>

              <TableCell>{candidate.education_level}</TableCell>

              <TableCell className="flex items-center flex-wrap gap-1">
                {candidate.key_skills_match.map((item: string, itemIndex: number) => (
                  <h1
                    key={`${item}-skill-${itemIndex}`}
                    className="text-white text-[10px] bg-blue-800 rounded-md px-2 py-[3px]"
                  >
                    {item}
                  </h1>
                ))}
              </TableCell>
              <TableCell>{candidate.years_of_experience}</TableCell>

              <TableCell className="flex items-center flex-wrap gap-1">
                {candidate.certifications.map((item: string, itemIndex: number) => (
                  <h1
                    key={`${item}-cert-${itemIndex}`}
                    className="text-white text-[10px] bg-blue-800 rounded-md px-2 py-[3px]"
                  >
                    {item}
                  </h1>
                ))}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Candidates</TableCell>
          {loading ? (<TableCell>
            <Skeleton className="h-4 w-[50px]" />
          </TableCell>) : (
            <TableCell className="text-right">{tableData.length}</TableCell>

          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
