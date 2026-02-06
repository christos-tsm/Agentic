import { Head } from "@inertiajs/react"
import ProjectForm from "@/components/forms/ProjectForm";
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as projectsIndex } from "@/routes/projects"
import type { BreadcrumbItem } from "@/types";
import type { ClientsList } from "@/types/clients";
import type { Project } from "@/types/projects";

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

const ShowProjectsPage = ({ project, clients }: { project: Project, clients: ClientsList }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Επεξεργασία πρότζεκτ" />
            <ProjectForm project={project} clients={clients} />
        </AppLayout>
    )
}

export default ShowProjectsPage