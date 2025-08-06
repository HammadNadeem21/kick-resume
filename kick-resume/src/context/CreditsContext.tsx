// // context/CreditsContext.tsx
// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// type CreditsContextType = {
//   credit: number;
//   setCredit: (credit: any) => void;
// };

// const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

// export const CreditsProvider = ({ children }: { children: ReactNode }) => {
//   const [credit, setCredit] = useState<number>(0);

//   // Optional: Get initial credits from API on mount
//   useEffect(() => {
//     const fetchCredits = async () => {
//       try {
//         const res = await fetch("/api/credits/get", {
//           method: "POST",
//           body: JSON.stringify({
//             email: /* get email from session or prop */ "",
//           }),
//         });
//         const data = await res.json();
//         if (data.credits !== undefined) {
//           setCredit(data.credits);
//         }
//       } catch (error) {
//         console.error("Error fetching credits", error);
//       }
//     };

//     fetchCredits();
//   }, []);

//   return (
//     <CreditsContext.Provider value={{ credit, setCredit }}>
//       {children}
//     </CreditsContext.Provider>
//   );
// };

// // Custom Hook
// export const useCredits = () => {
//   const context = useContext(CreditsContext);
//   if (!context) {
//     throw new Error("useCredits must be used within a CreditsProvider");
//   }
//   return context;
// };

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

type CreditsContextType = {
  credit: number;
  setCredit: (credit: number) => void;
};

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: ReactNode }) => {
  const [credit, setCredit] = useState<number>(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchCredits = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch("/api/credits/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
          }),
        });

        const data = await res.json();
        if (data.credits !== undefined) {
          setCredit(data.credits);
        }
      } catch (error) {
        console.error("Error fetching credits", error);
      }
    };

    if (status === "authenticated") {
      fetchCredits();
    }
  }, [session, status]);

  return (
    <CreditsContext.Provider value={{ credit, setCredit }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};
