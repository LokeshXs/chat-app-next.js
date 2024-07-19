import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function NewButton({ children,className }: {children:React.ReactNode,className?:string}) {
  return <Button className={cn(`icon-btn ${className}`)}>{children}</Button>;
}
