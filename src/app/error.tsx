"use client";

import { AlertTriangle} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
    return(
    <div className="h-screen flex-col gap-y items-center justify-center">
        <AlertTriangle className="size-6"/>
        <p className="text-sa text-muted-foreground">
            Somthing went wrong
        </p>
        <Button variant="secondary">
            <Link href="/">
            Back home
             </Link>
        </Button>   
           
       

    </div>



    );



}
export default ErrorPage;