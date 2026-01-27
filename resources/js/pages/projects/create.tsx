import { Head, router } from "@inertiajs/react"
import { useState } from "react";
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as projectsIndex } from "@/routes/projects"
import { BreadcrumbItem } from "@/types";
import { Projects, PROJECTS_STATUS, ProjectsStatus } from "@/types/projects";
import { Plus } from "lucide-react";
import ProjectForm from "@/components/forms/ProjectForm";

type ProjectsPageType = {
    projects: Projects;
    filters?: {
        search?: string;
        status?: ProjectsStatus
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Προτζεκτ',
        href: projectsIndex().url,
    },
    {
        title: 'Δημιουργία νέου προτζεκτ',
        href: '#!',
    },
];

const CreateProjectsPage = () => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <ProjectForm />
        </AppLayout>
    )
}

export default CreateProjectsPage