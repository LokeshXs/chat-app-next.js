"use client";

import { Check, ChevronsUpDown, MessageCircleDashed } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { searchUserAction } from "@/actions/searchUserAction";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "../loader/Loader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchUserSchema } from "@/lib/zod";
import { sendChatRequest } from "@/actions/sendChatRequest";
import { useTransition } from "react";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "@/store/ChatBarSlice";

export default function ChatRequestModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [fetching, setFetching] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 1000);
  const dispatch  = useDispatch();
  const [fetchedUsers, setFetchedUsers] =
    useState<{ name: string | null; email: string; id: string }[]>();

  const form = useForm<z.infer<typeof searchUserSchema>>({
    resolver: zodResolver(searchUserSchema),
  });

  useEffect(() => {
    // console.log(debounceValue);

    searchUserAction({ email: debounceValue }).then((res) => {
      if (res.status === "success") {
        console.log(res);

        setFetchedUsers(res.data);
      }
      setFetching(false);
    });
  }, [debounceValue]);

  useEffect(() => {
    if (searchValue.length !== 0) {
      console.log(searchValue);
      setFetchedUsers([]);
      setFetching(true);
    }
  }, [searchValue]);

  const searchUser = (value: string) => {
    setSearchValue(value);
  };

  function onSubmit(formData: z.infer<typeof searchUserSchema>) {
    console.log(formData);
    startTransition(() => {
      sendChatRequest(formData).then((res) => {
        if (res.status === "success") {
          // toast logic
          toast.success(res.message)
        }else{
          toast.error(res.message)
        }
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger className=" w-full px-8" onClick={()=>{dispatch(toggleSideBar())}} >
        <span className="flex gap-4 items-center bg-primary hover:bg-primary/90 text-primary-foreground px-2 py-4 justify-center rounded-xl">
          <p className=" text-lg">Send a chat request</p>
          <MessageCircleDashed />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className=" space-y-12">
          <DialogTitle className=" text-center">Search by mail id</DialogTitle>

          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isPending}
                          >
                            {field.value
                              ? fetchedUsers?.find(
                                  (user) => user.email === field.value
                                )?.name
                              : "Search user..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command className=" w-96">
                            <CommandInput
                              placeholder="Search user..."
                              onValueChange={(value) => {
                                searchUser(value);
                              }}
                            />

                            <CommandEmpty>
                              {fetching ? <Loader /> : "No user found."}
                            </CommandEmpty>
                            <CommandList>
                              {fetchedUsers?.map((user) => (
                                <CommandItem
                                  key={user.email}
                                  value={user.email}
                                  onSelect={(currentValue) => {
                                    form.setValue("email", currentValue);
                                    form.setValue("id", user.id);
                                    setValue(
                                      currentValue === user.email
                                        ? ""
                                        : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === user.email
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {user.name}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please enter minimum 3 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className=" w-full mt-12"
                  disabled={isPending}
                >
                  {isPending ? "Sending" : "Send"}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
