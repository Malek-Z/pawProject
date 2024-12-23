"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import MemberAvatar from "@/features/members/components/member-avatar";

import { MemberRole } from "@/features/members/types";

import useWorkspaceId from "../hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import useConfirme from "@/hooks/use-confirm";

import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const MembersList = () => {

    const workspaceId = useWorkspaceId();
    const [ ConfirmDialog, Confirm ] = useConfirme( "Remove Member", "This Member will be removerd from the WorkSpace", "destructive");

    const { data } = useGetMembers({workspaceId});

    const { mutate: deleteMember , isPending: isDeleteMember } = useDeleteMember();
    const { mutate: updateMember , isPending: isUpdateMember } = useUpdateMember();

    const handleUpdateMember = ( memberId: string , role: MemberRole ) => {
        updateMember({ json: { role }, param: { memberId } })
    }

    const handleDeleteMember = async ( memberId: string ) => {

        const ok = await Confirm();

        if( !ok ) return;

        deleteMember({ param: {memberId} } , {
            onSuccess: ()=>{
                window.location.reload();
            }
        })

    }

    return ( 
        <Card className="w-full border-none shadow-none">
            <ConfirmDialog />
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <Button asChild variant="secondary">
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2 "/>
                        Back
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                   Member List 
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">

                { data?.documents.map(( member, index ) => (
                    <Fragment key={ member.$id } >
                        <div className="flex items-center gap-2">
                            <MemberAvatar className="size-10" fallbackClassName="text-lg" name={ member.name }/>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{ member.name }</p>
                                <p className="text-xm text-muted-foreground">{ member.email }</p>
                            </div>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button className="ml-auto" variant="secondary">
                                        <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem className="font-medium" onClick={ () => handleUpdateMember( member.$id, MemberRole.ADMIN ) } disabled={isUpdateMember}>
                                        Set as Administrator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="font-medium" onClick={ () => handleUpdateMember( member.$id, MemberRole.MEMBER ) } disabled={isUpdateMember}>
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="font-medium text-amber-700" onClick={ () => handleDeleteMember( member.$id ) } disabled={isDeleteMember}>
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < data.documents.length -1 && (
                            <Separator className="my-2.5"/>
                        ) }
                    </Fragment>
                )) 
                }
            </CardContent>
        </Card>
     );
}
 
export default MembersList;