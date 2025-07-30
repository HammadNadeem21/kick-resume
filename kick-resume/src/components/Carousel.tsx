// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export function CarouselSize({ array }: { array: any[] }) {
//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       className="w-full max-w-sm"
//     >
//       <CarouselContent>
//         {array.map((_, index) => (
//           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-3xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }

"use client";

import * as React from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Template = {
  id: number;
  name: string;
  image: string;
};

export function CarouselSize({
  array,
  getTemplateId,
  selectedTemplate,
}: {
  array: Template[];
  getTemplateId: (id: number) => void;
  selectedTemplate: number | null;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-5xl"
    >
      <CarouselContent>
        {array.map((template) => (
          <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/4">
            <div
              onClick={() => getTemplateId(template.id)}
              className="relative cursor-pointer mb-2 rounded-md transition-all duration-300 "
            >
              <div className="h-[300px] w-[230px] shadow-md shadow-purple-400">
                <Image
                  src={template.image}
                  alt={template.name}
                  height={250}
                  width={250}
                  className="h-full w-full "
                />
              </div>

              {selectedTemplate === template.id && (
                <div
                  className="absolute inset-0 h-[300px] w-[230px] bg-gray-700 bg-opacity-50 flex items-center justify-center"
                  style={{ zIndex: 10 }}
                >
                  <div className="border border-white text-white rounded-full px-1 py-1 z-20">
                    <TiTick size={50} />
                  </div>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
