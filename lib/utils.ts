import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function localeTimeFormatter(dateInIso:string){


  const date = new Date(dateInIso);
const localTimeString = date.toLocaleTimeString('en-IN',{
  hour:'2-digit',minute:'2-digit',hour12:true
});

return localTimeString;
}