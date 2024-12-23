"use client"

import { PageLoader } from "@/components/page-loader";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

import { EditProjectForm } from "@/features/projects/components/edit-project-form";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProjectIdSettingsClient = () => {

    const projectId = useProjectId();

    const { data: initialValues , isLoading } = useGetProject({ projectId });

    if (isLoading) return <PageLoader />

    return (

        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues= {initialValues}/>
        </div>


    )

} 

export default ProjectIdSettingsClient;