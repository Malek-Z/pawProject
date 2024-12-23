"use client"

import { usePathname } from "next/navigation";

import { UserButton } from "@/features/auth/components/use-button";
import { MobileSidebar } from "./mobile-sidebar";

const pathnameMap = {

    "tasks" : {
        title: "My Tasks",
        description: "View All of Your Tasks here",
    },
    "projects" : {
        title: "My Project",
        description: "View Tasks of Your Project here",
    }

}

const defaultMap = {
    title: "DashBoard",
    description: "Monitor all of your projects and tasks here"
}

export const Navbar = () => {

    const pathname = usePathname();
    const pathnameParts = pathname.split("/")
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

    const { title , description } = pathnameMap[pathnameKey] || defaultMap

    return ( 
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">
                    {title}
                </h1>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            <MobileSidebar/>
            <UserButton />
        </nav>
     );
}
 