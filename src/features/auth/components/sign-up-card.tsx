"use client"

import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../schema"
import { useRegister } from "../api/use-register"


import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"


import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import {
    Card, 
    CardContent , 
    CardDescription, 
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



export const SignUpCard = ()=>{

    const { mutate , isPending }= useRegister();

    const formV=useForm < z.infer < typeof registerSchema >> ({
        resolver : zodResolver(registerSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        }
    })

    const onSubmit = (values : z.infer<typeof registerSchema>)=>{
        mutate({json:values})
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl ">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By Signing Up you agree to our  
                    <Link href="/privacy">
                        <span className="text-blue-700"> Privacy Policy</span>
                    </Link>{" "}
                    And{" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7 ">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...formV}>
                    <form onSubmit={formV.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={formV.control}
                            render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        type="name"
                                        placeholder="Enter your name"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
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
                            Register
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
                    You have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700"> Login in</span>
                    </Link>
                </p>
                
            </CardContent>

        </Card>
    )
}