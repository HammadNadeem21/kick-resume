// components/AccordionSection.tsx
"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function AccordionSection({ title, children }: Props) {
  return (
    <div className="w-full border-b">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-lg font-semibold text-myDarkblue hover:bg-gray-100">
              <span>{title}</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-myDarkblue`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pb-4 text-gray-700">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
