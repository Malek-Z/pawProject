"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useUpdateProject } from "../api/use-update-project";
import useConfirme from "@/hooks/use-confirm";

import { updateProjectSchema } from "../schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar , AvatarFallback } from "@/components/ui/avatar";

import Image from "next/image"; 

import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "../types";
import { useDeleteProject } from "../api/use-delete-project";



interface EditProjectFormProps{
    onCancel? : ()=>void;
    initialValues: Project;
}

export const EditProjectForm=({ onCancel, initialValues }:EditProjectFormProps) =>{

    const router = useRouter();

    const { mutate , isPending: isUpdateingProject } = useUpdateProject();
    const { mutate: deleteProject, isPending: isDeletingProject } = useDeleteProject(); 

    const [DeleteDialog , confirmDelete] = useConfirme( "Delete Project", "This Action Connot be Undone", "destructive" );

    const handleDelete = async () =>{

        const ok = await confirmDelete();

        if(!ok) return

       deleteProject({ param: {projectId: initialValues.$id},
       }, {
            onSuccess: () => {
                window.location.href= "/";
            },
        });    
    };

    const inputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver : zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        },
    })
 


    const onSubmit=(values : z.infer<typeof updateProjectSchema>) =>{

        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image :"",
        }

        mutate({ form : finalValues , param: { projectId: initialValues.$id }  },);
    };

    const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            form.setValue("image",file);
        }
    };

    const isPending = isUpdateingProject || isDeletingProject;

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-3">
                    <Button size="sm" variant="secondary" onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}>
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialValues.name}
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="p-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-4">
                                <FormField 
                                control={form.control}
                                name="name"
                                render={( {field} ) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                            {...field}
                                            placeholder="Enter Project Name"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="image"
                                    render={ ({field}) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image
                                                            alt="Logo"
                                                            fill
                                                            className="object-cover"
                                                            src={
                                                                field.value instanceof File 
                                                                    ? URL.createObjectURL(field.value) 
                                                                    : field.value
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-400 "/>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">Project Icon</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        JPG, PNG , SVG or JPEG .... Max 1 Mb
                                                    </p>
                                                    <input
                                                        className="hidden"
                                                        type="file"
                                                        accept=" .jpg , .png , .jpeg , .svg"
                                                        ref={inputRef}
                                                        onChange={handleImageChange}
                                                        disabled={isPending}
                                                    />
                                                    {field.value ? (
                                                        <Button 
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="destructive"
                                                            size="sm"
                                                            className="w-fit mt-2"
                                                            onClick={()=> inputRef.current?.click()}
                                                            >
                                                            Remove Image
                                                        </Button>
                                                    ) :(
                                                        <Button 
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="link"
                                                            size="sm"
                                                            className="w-fit mt-2"
                                                            onClick={()=> inputRef.current?.click()}
                                                        >
                                                            Upload Image
                                                        </Button>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}/>
                            </div>
                            <DottedSeparator className="py-7"/>
                            <div className="flex items-center justify-between">
                                <Button 
                                    type="button"
                                    size="lg"
                                    variant="secondary"
                                    onClick={onCancel}
                                    disabled={isPending}
                                    className={cn(!onCancel && "invisible")}>
                                    Cancel
                                </Button>
                                <Button 
                                    disabled={isPending}
                                    size="lg">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                       <h3 className="font-bold">Danger Zone</h3> 
                       <p className="text-sm text-muted-foreground">
                           Deleting a Project is irreversible and Will remove all associated data            
                       </p>
                       <DottedSeparator className="py-7"/>
                       <Button className="mt-6 w-fit ml-auto" size="sm" variant="destructive" type="button" disabled={isPending} onClick={handleDelete}>
                           Delete Project    
                       </Button>
                    </div>                 
                </CardContent>                     
            </Card>
        </div>
    )
}