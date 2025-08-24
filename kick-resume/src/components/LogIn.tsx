// import { signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// export function DialogDemo() {
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button variant="outline">Open Dialog</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Name</Label>
//               <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1">Username</Label>
//               <Input id="username-1" name="username" defaultValue="@peduarte" />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// }

"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type AuthDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // credentials handler
  const handleCredentialsSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true, // agar redirect chahiye
        callbackUrl: "/", // kis page pr redirect karna hai
      });
    } catch (error) {
      console.error("Error signing in with credentials:", error);
    }
  };

  // google handler
  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Sign up using your email & password or continue with Google.
          </DialogDescription>
        </DialogHeader>

        {/* Credentials SignUp */}
        <form onSubmit={handleCredentialsSignUp} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-gray-300 hover:bg-gray-400"
            >
              Sign Up with Email
            </Button>
          </DialogFooter>
        </form>

        <div className="text-center text-lg text-gray-700">or</div>

        {/* Google SignUp */}
        <Button
          onClick={handleGoogleSignUp}
          className="w-full bg-gray-300 hover:bg-gray-400"
        >
          Continue with Google
        </Button>

        {/* <DialogClose asChild>
          <Button variant="ghost" className="w-full mt-2">
            Cancel
          </Button>
        </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
