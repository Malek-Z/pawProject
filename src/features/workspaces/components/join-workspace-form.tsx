"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useJoinWorkspace } from "../api/use-join-workspace";
import useInviteCode from "../hooks/use-invite-code";
import useWorkspaceId from "../hooks/use-workspace-id";

interface JoinWorkspaceFormProps {
    initialValues:{
        name: string,
    }
}

export const JoinWorkspaceForm = ({ initialValues }:JoinWorkspaceFormProps) => {

    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate , isPending } = useJoinWorkspace()
    const inviteCode = useInviteCode();

    const onSubmit = () => {
        
        mutate({
            param: {workspaceId},
            json: {code: inviteCode}
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join WorkSpace
                </CardTitle>
                <CardDescription>
                    You ve been Invited To Join <strong>{initialValues.name}</strong> WorkSpace
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                    <Button asChild size="lg" variant="secondary" type="button" className="w-full lg:w-fit" disabled={isPending}>
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button className="w-full lg:w-fit" size="lg" type="button" onClick={onSubmit} disabled={isPending}>
                        Join WorkSpace
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}