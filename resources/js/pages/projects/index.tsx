import { Head, Link, router } from "@inertiajs/react"
import { useState } from "react";
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as projectsIndex, create } from "@/routes/projects"
import { BreadcrumbItem } from "@/types";
import { Projects, PROJECTS_STATUS, ProjectsPageData, ProjectsStatus } from "@/types/projects";
import { Plus } from "lucide-react";
import ProjectForm from "@/components/forms/ProjectForm";
import { PaginationComponent } from "@/components/ui/pagination";

type ProjectsPageType = {
    projects: ProjectsPageData;
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
];

const ProjectsPage = ({ projects, filters = {} }: ProjectsPageType) => {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState<ProjectsStatus | ''>(filters?.status || '');

    const handleFilter = () => {
        router.get(projectsIndex().url, {
            search: search || undefined,
            status: status || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {
                search: search || undefined,
                status: status || undefined,
            }, {
                preserveState: true,
                preserveScroll: false,
            });
        }
    };

    console.log(projects.data)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <div className="border rounded border-gray-200 px-4 py-2 flex-1">
                        <input
                            type="text"
                            placeholder="Τίτλος, Όνομα πελάτη"
                            name="search"
                            id="search"
                            className="outline-0 text-sm font-medium w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="border rounded border-gray-200 px-4 py-2">
                        <select
                            name="status"
                            id="status"
                            className="outline-0 text-sm font-medium bg-transparent cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as ProjectsStatus)}
                        >
                            <option value="" selected disabled>Κατάσταση</option>
                            {PROJECTS_STATUS.map(
                                stat => <option key={stat}>{stat}</option>
                            )}
                        </select>
                    </div>
                    <button
                        onClick={handleFilter}
                        className="text-white font-medium text-sm px-4 py-2 rounded cursor-pointer bg-primary"
                    >
                        Αναζήτηση
                    </button>
                </div>
                {projects.data.length >= 1 ?
                    <>
                        <div className="min-h-[469px]">
                            <div className="grid grid-cols-5 border-b border-b-gray-200 text-sm py-2">
                                <p>Τίτλος</p>
                                <p>Πελάτης</p>
                                <p>Κατάσταση</p>
                                <p>Budget</p>
                                <p>Deadline</p>
                            </div>
                            {projects.data.map(project =>
                                <div key={project.id} className="grid grid-cols-5 text-sm odd:bg-gray-200 py-2">
                                    <p className="font-bold">{project.title}</p>
                                    <p className="font-medium">{project.client.company_name || project.client.name || '-'}</p>
                                    <p className="font-medium">
                                        {project.status}
                                    </p>
                                    <p className="font-medium">
                                        {project.budget}
                                    </p>
                                    <p className="font-medium">
                                        {project.deadline_at}
                                    </p>
                                </div>
                            )}
                        </div>
                        <PaginationComponent
                            pagination={projects}
                            onPageChange={handlePageChange}
                            infoLabel={(from, to, total) => `Εμφάνιση ${from} - ${to} από ${total} πελάτες`}
                        />
                    </>
                    : <p>Δεν βρέθηκαν πρότζεκτ</p>}
            </div>

            <Link
                href={create().url}
                className="fixed bottom-5 right-5 inline-flex justify-center items-center cursor-pointer rounded-full py-2 px-5 text-sm font-medium gap-2 bg-primary text-white z-5"
            >
                Προσθήκη πρότζεκτ
                <Plus />
            </Link>
        </AppLayout>
    )
}

export default ProjectsPage