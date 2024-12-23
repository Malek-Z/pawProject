"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthLayoutProps{
    children: React.ReactNode;
}

const AuthLayout=({ children }:AuthLayoutProps) => {

    const pathName= usePathname();

  return (
    <main className="bg-neutral-100 min-h-screen">        
        <div className="mx-auto max-w-screen-2xl p-4">
            <nav className="flex justify-between items-center">
                <Image  src="/Todo_list.svg" height={160} width={160} alt="Logo"/>
                <Button asChild variant="secondary">
                    <Link href={pathName === "/sign-in" ? "/sign-up" : "/sign-in"}>
                        {pathName === "/sign-in" ? "Sign Up" : "Login"}
                    </Link>
                </Button>
            </nav>
        </div>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
            {children}
        </div>
    </main>

  )
}

export default AuthLayout