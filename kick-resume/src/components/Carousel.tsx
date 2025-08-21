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
      className=" lg:w-[90%] w-[60%] max-w-5xl"
    >
      <CarouselContent>
        {array.map((template) => (
          <CarouselItem
            key={template.id}
            className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 mx-auto"
          >
            <div
              onClick={() => getTemplateId(template.id)}
              className="relative cursor-pointer mb-2 rounded-md transition-all duration-300 "
            >
              <div className="sm:h-[240px] h-[340px] w-full shadow-md shadow-mySkyBlue ">
                <Image
                  src={template.image}
                  alt={template.name}
                  height={500}
                  width={500}
                  className="h-full w-full "
                />
              </div>

              {selectedTemplate === template.id && (
                <div
                  className="absolute inset-0 sm:h-[240px] h-[340px] w-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
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
