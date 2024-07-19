import { signInAction } from "@/actions/authentication";
import {  SignInForm } from "@/components/SigninForm";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className=" min-h-screen flex justify-center items-center">
      
      <div className=" max-w-[1600px]  min-h-[800px] w-full h-full flex  shadow-md rounded-2xl overflow-hidden bg-primary">
          <div className=" max-w-[700px] w-full  bg-primary-foreground">
            <div className=" bg-primary h-full w-full flex justify-center items-center  rounded-tr-[80px] ">

          <Image src="/auth-illustration.svg" alt="Chatting" width={600} height={600} />
            </div>
          </div>
          <div className=" flex-1 bg-primary-foreground rounded-bl-[80px]  p-12 flex flex-col ">
            <h1 className=" text-3xl font-medium text-center">Sign in</h1>
            
           <div className="flex-1 flex items-center justify-center ">
           <SignInForm action={signInAction} />
           </div>
            
          </div>
      </div>
    </main>
  );
}
