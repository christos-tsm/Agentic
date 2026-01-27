import { Form, Head, router } from "@inertiajs/react"
import { useState } from "react";
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as projectsIndex, update } from "@/routes/projects"
import { BreadcrumbItem } from "@/types";
import { Projects, PROJECTS_STATUS, ProjectsStatus } from "@/types/projects";
import { Plus } from "lucide-react";
import ProjectForm from "@/components/forms/ProjectForm";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

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
        title: 'Επεξεργασία προτζεκτ',
        href: '#!',
    },
];

const ShowProjectsPage = ({ project }: { project: Projects }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Επεξεργασία πρότζεκτ" />
            <ProjectForm project={project} />
        </AppLayout>
    )
}

export default ShowProjectsPage