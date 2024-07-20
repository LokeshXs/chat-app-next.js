import {signUpAction } from "@/actions/authentication";

import { SignUpForm } from "@/components/SignupForm";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className=" min-h-screen flex justify-center items-center">
      
      <div className=" max-w-[1600px]  min-h-[800px] w-full h-full flex  shadow-md rounded-2xl overflow-hidden bg-primary">
          <div className=" max-w-[700px] w-full  bg-primary-foreground">
            <div className=" bg-primary h-full w-full flex justify-center items-center  rounded-tr-[80px] ">

          <Image src="/auth-illustration.svg" alt="Chatting" width={600} height={600} />
            </div>
          </div>
          <div className=" flex-1 bg-primary-foreground rounded-bl-[80px]  p-12 flex flex-col ">
            <h1 className=" text-3xl font-medium text-center">Sign up</h1>
            
           <div className="flex-1 flex items-center justify-center relative ">
           <SignUpForm action={signUpAction} />

           <Link href={BASE_URL} className=" absolute bottom-0 text-primary">
            Go to Home page
            </Link>
           </div>
            
          </div>
      </div>
    </main>
  );
}
