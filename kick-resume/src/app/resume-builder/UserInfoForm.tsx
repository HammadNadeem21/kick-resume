"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form"

interface persnolInfo{
  fullName: string;
  email: string;
  phone: number;
  address: string;
  languages: string[];
}

export function TabsDemo() {
  const [languages, setLanguages] = useState([""]);

  const addLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };

  const {handleSubmit, register} = useForm<persnolInfo>()
  const submit = (data:persnolInfo) => {
    console.log("Data",data)
  }

  return (
    <Tabs defaultValue="account" className="sm:w-[500px] w-[350px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Personal Details">Personal Details</TabsTrigger>
        <TabsTrigger value="Skills & Education">Skills & Education</TabsTrigger>
        <TabsTrigger value="Experience & Projects">
          Experience & Projects
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Personal Details">
        <Card>
          {/* <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
          <form onSubmit={handleSubmit(submit)} className="grid items-center px-3 py-3 gap-1">
            <div className="text-myMidblue">
              <Label>Full Name</Label>
              <Input {...register("fullName")} type="text" placeholder="Full Name" className="bg-transparent focus:outline-none"/>
            </div>

            <div className="text-myMidblue">
              <Label>Email</Label>
              <Input {...register("email")} type="email" placeholder="Email" className="bg-transparent focus:outline-none"/>
            </div>

            <div className="text-myMidblue">
              <Label>Phone</Label>
              <Input
              {...register("phone")}
                type="number"
                placeholder="Phone"
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent focus:outline-none"
              />
            </div>

            <div className="text-myMidblue flex flex-col">
              <Label>Address</Label>
              <textarea {...register("address")} className="bg-transparent border border-myMidblue rounded-lg mt-1 focus:outline-none px-2 py-1"></textarea>
            </div>

            <div className="text-myMidblue">
              <Label>Language</Label>
              {languages.map((lang, idx) => (
                <div key={idx} className="flex items-center mb-2 space-x-2 mt-1">
                  <input
                    
                    {...register(`languages.${idx}`)}
                    type="text"
                    value={lang}
                    onChange={(e) => handleLanguageChange(idx, e.target.value)}
                    className="bg-transparent border border-myMidblue rounded-lg px-3 py-2 flex-grow focus:outline-none"
                  />
                  {idx === languages.length - 1 && (
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="text-primaryColor rounded px-3 py-3 font-bold  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus/>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <Button type="submit" className="text-primaryColor  w-[30%] bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out">Next</Button>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="Skills & Education">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="Experience & Projects">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
