"use client"

import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../schema"
import { useLogin } from "../api/use-login"


import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"


import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import {
    Card, 
    CardContent , 
    CardHeader ,
    CardTitle
} from "@/components/ui/card"

import {
    Form, 
    FormControl , 
    FormField ,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"



export const SignInCard = ()=>{

    const { mutate, isPending }=useLogin();

    const formV=useForm < z.infer < typeof loginSchema >> ({
        resolver : zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })

    const onSubmit = (values : z.infer<typeof loginSchema>)=>{
        mutate({json:values})
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl ">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <div className="px-7 ">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...formV}>
                    <form onSubmit={formV.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            control={formV.control}
                            render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        type="email"
                                        placeholder="Enter email address"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                            name="password"
                            control={formV.control}
                            render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        
                        <Button size="lg" className="w-full" disabled={isPending}>
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button 
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full">
                    <FcGoogle className="mr-2 size-5"/>
                    Login with Google
                </Button>
                <Button 
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full">
                    <FaGithub className="mr-2 size-5"/>
                    Login with GitHub
                </Button>
            </CardContent>

            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Dont have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700"> Sign Up</span>
                    </Link>
                </p>
            </CardContent>

        </Card>
    )
}