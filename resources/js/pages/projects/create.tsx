import { Head } from "@inertiajs/react"
import ProjectForm from "@/components/forms/ProjectForm";
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as projectsIndex } from "@/routes/projects"
import type { BreadcrumbItem } from "@/types";
import type { ClientsList } from "@/types/clients";


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

const CreateProjectsPage = ({ clients }: {clients: ClientsList}) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <ProjectForm clients={clients} />
        </AppLayout>
    )
}

export default CreateProjectsPage