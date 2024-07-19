import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Glasses, Star, UserRound, Circle, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NewButton from "@/components/NewButton";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <main >
      <NavBar />
      <div className="p-12 max-sm:p-4 container mx-auto">
        <header className=" flex max-lg:flex-col gap-12 max-xl:gap-4 max-lg:gap-12 max-sm:gap-6 items-center">
          <div className=" space-y-12 max-sm:space-y-6 max-lg:w-full">
            <h1 className=" text-7xl max-md:text-6xl w-full font-bold leading-tight max-sm:text-4xl ">
              It&apos;s easy talking <br /> to your friends <br /> with Chatapp
            </h1>

            <Link href="/signin">
            <NewButton className=" bg-foreground hover:bg-foreground rounded-full ">
              <p>Get Started</p>
              <ChevronRight className=" w-5 h-5" />
            </NewButton>
            </Link>

            <div className=" flex  gap-12 max-sm:gap-6 items-center ">
              <div className=" flex flex-col gap-1 items-center">
                <Glasses className=" w-10 h-10 max-sm:w-8 max-sm:h-8" />
                <p className=" text-2xl max-sm:text-xl font-semibold">500 k</p>
                <p className=" text-muted-foreground max-sm:text-sm">Visitors</p>
              </div>
              <Separator orientation="vertical" className=" w-1 h-20" />
              <div className=" flex flex-col gap-1 items-center">
                <Star className=" w-10 h-10  max-sm:w-8 max-sm:h-8" />
                <p className=" text-2xl max-sm:text-xl font-semibold">5.0</p>
                <p className=" text-muted-foreground  max-sm:text-sm">Rating</p>
              </div>
              <Separator orientation="vertical" className=" w-1 h-20" />
              <div className=" flex flex-col gap-1 items-center">
                <UserRound className=" w-10 h-10  max-sm:w-8 max-sm:h-8" />
                <p className=" text-2xl max-sm:text-xl font-semibold">100M</p>
                <p className=" text-muted-foreground  max-sm:text-sm">Users</p>
              </div>
            </div>
          </div>
          <div className=" flex-1  p-4 min-w-[400px] max-sm:min-w-min">
            <div className=" flex justify-center gap-12 max-sm:gap-4">
              <div className=" space-y-10 max-sm:space-y-6 ">
                <span className=" flex items-center gap-4 max-sm:gap-2 ">
                  <Avatar>
                    <AvatarImage src="/hero-2.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className=" space-y-2">
                    <p className=" p-2 bg-primary text-primary-foreground rounded-2xl rounded-bl-none font-medium max-sm:text-xs">
                      Hi, Emma
                    </p>
                    <p className=" p-2 bg-muted rounded-2xl rounded-bl-none font-medium flex items-center gap-1 w-fit">
                      <Circle className=" bg-muted-foreground rounded-full text-muted-foreground w-4 h-4 max-sm:w-3 max-sm:h-3" />
                      <Circle className=" bg-muted-foreground rounded-full text-muted-foreground w-3 h-3 max-sm:w-2 max-sm:h-2" />
                      <Circle className=" bg-muted-foreground rounded-full text-muted-foreground w-2 h-2 max-sm:w-1 max-sm:h-1" />
                    </p>
                  </div>
                </span>

                <span className="block">
                  <Image
                    src="/hero-1.jpg"
                    alt="Girl"
                    width={260}
                    height={300}
                    className=" rounded-2xl  "
                  />
                </span>
              </div>
              <div className=" space-y-10 max-sm:space-y-6 self-end pt-60 ">
                <span className="block">
                  <Image
                    src="/hero-2.jpg"
                    alt="Girl"
                    width={260}
                    height={300}
                    className=" rounded-2xl"
                  />
                </span>

                <span className=" flex items-center gap-4 max-sm:gap-2 ">
                  <div className=" space-y-2">
                    <p className=" p-2 bg-primary/40 rounded-2xl rounded-br-none font-medium max-sm:text-xs">
                      Hello, Can we meet today?
                    </p>
                  </div>
                  <Avatar>
                    <AvatarImage src="/hero-1.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
    </main>
  );
}
