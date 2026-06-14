"use client"

import { useAuthStore } from "@/store/auth.store";
import Logo from "../Logo";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function Navbar(){

    const { user } = useAuthStore();

    const router = useRouter();
    
    return (
        <div className="flex px-4 py-2 gap-14 h-[8vh] w-full border-[0.5px] border-slate-600 box-border ">
            <Link href={"/"}>
                <Logo/>
            </Link>        
        
        
        <div className="flex w-full items-center gap-14 justify-end">

            <Link className="hover:text-white duration-150 " href={"/problemset"}>
          Problems
        </Link>

            {
            user ? <>
              <ProfileDropdown/>
            </> : (
                <Button onClick={()=>router.push("login")} variant={"default"}>
                    Login
                </Button>
            )
        }
        </div>

    </div>
    )
};