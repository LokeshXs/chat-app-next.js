import Link from "next/link";
import { Button } from "./ui/button";
import ModeSwitch from "./modeSwitch/ModeSwitch";

export default function NavBar(){

    return (
        <nav className=" flex justify-between items-center w-full border border-t-0 rounded-b-3xl container py-4 max-sm:px-2">
            <p className=" text-2xl max-sm:text-lg font-semibold">Chatapp</p>

            <div className=" gap-4 max-sm:gap-2 flex items-center">
               <Link href="/signup">
               <Button className=" bg-background text-foreground shadow-none hover:bg-background" >
                    Sign up
                </Button>
                </Link>

                <Link href="/signin">
                <Button className=" bg-foreground hover:bg-foreground/80 rounded-full">
                    Sign in
                </Button>
                </Link>

                <ModeSwitch />
            </div>
        </nav>
    )
}