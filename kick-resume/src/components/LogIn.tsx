import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"

export function Login() {
     const [mode, setMode] = useState<'login' | 'signup' | null>(null);


  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-myWhite hover:text-myWhite hover:bg-myDarkBlue/70">LogIn</Button>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log In Options</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password"  type="password" required/>
            </div>
          </div>
          <div className="text-center">Or</div>

          <Button type="submit" className="bg-white hover:bg-white">
            <Image src='/GoogleLogo.png' alt="google-logo" height={30} width={30}/>
          Log In with Google</Button>
          <DialogFooter>
            <DialogClose asChild>
              {/* <Button variant="outline">Cancel</Button> */}
            </DialogClose>
            <Button type="submit" className="w-full bg-myDarkBlue">Log In</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
