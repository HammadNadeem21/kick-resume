import { Button } from "@/components/ui/button";
import { AiOutlineGlobal } from "react-icons/ai";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HoverButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="text-myWhite hover:text-myWhite outline-none border-none bg-mySkyBlue/50 hover:bg-mySkyBlue"
          >
            <AiOutlineGlobal />
            English
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="hover:bg-mySkyBlue/30 text-black py-2 px-2 rounded-md">
            French
          </p>
          <p className="hover:bg-mySkyBlue/30 text-black py-2 px-2 rounded-md">
            Italian
          </p>
          <p className="hover:bg-mySkyBlue/30 text-black py-2 px-2 rounded-md">
            Arabic
          </p>
          <p className="hover:bg-mySkyBlue/30 text-black py-2 px-2 rounded-md">
            Spanish
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
