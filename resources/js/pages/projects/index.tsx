import { Head, Link, router } from "@inertiajs/react";
import { ExternalLink, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Notice from "@/components/ui/notice";
import { PaginationComponent } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TableContentRow from "@/components/ui/table-content-row";
import TableHeaderRow from "@/components/ui/table-header-row";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import { index as projectsIndex, create, show } from "@/routes/projects";
import type { BreadcrumbItem } from "@/types";
import { PROJECTS_STATUS } from "@/types/projects";
import type { ProjectsPageData, ProjectsStatus } from "@/types/projects";

type ProjectsPageType = {
    projects: ProjectsPageData;
    filters?: {
        search?: string;
        status?: ProjectsStatus
    };
    message?: string;
    status?: string;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Input
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
                    <div className="flex-1 max-w-87 [&>button]:max-w-full">
                        <Select name="status" onValueChange={(e) => setStatus(e as ProjectsStatus)} defaultValue={status}>
                            <SelectTrigger className="w-full max-w-48" id="status">
                                <SelectValue placeholder="Κατάσταση" />
                            </SelectTrigger>
                            <SelectContent className="w-full min-w-30">
                                <SelectGroup className="w-full">
                                    <SelectItem value="all">Όλες οι καταστάσεις</SelectItem>
                                    {PROJECTS_STATUS.map(
                                        stat => <SelectItem key={stat} value={stat}>{stat}</SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        onClick={handleFilter}
                        className="text-white font-medium text-sm px-4 py-2 rounded cursor-pointer bg-primary"
                    >
                        Αναζήτηση
                    </Button>
                </div>
                {projects.data.length >= 1 ?
                    <>
                        <div className="min-h-500">
                            <TableHeaderRow columns={5}>
                                <p>Τίτλος</p>
                                <p>Πελάτης</p>
                                <p>Κατάσταση</p>
                                <p>Budget</p>
                                <p>Deadline</p>
                            </TableHeaderRow>
                            {projects.data.map(project =>
                                <TableContentRow columns={5} key={project.id}>
                                    <p className="font-bold">
                                        <Link href={show(project.id).url} className="inline-flex items-center gap-2 duration-300 transition-colors hover:text-primary">
                                            <ExternalLink size={12} />
                                            {project.title}
                                        </Link>
                                    </p>
                                    <p>{project.client.name || project.client.company_name}</p>
                                    <p>
                                        {project.status}
                                    </p>
                                    <p>
                                        {project.budget}
                                    </p>
                                    <p>
                                        {project.deadline_at}
                                    </p>
                                </TableContentRow>
                            )}
                        </div>
                        <PaginationComponent
                            pagination={projects}
                            onPageChange={handlePageChange}
                            infoLabel={(from, to, total) => `Εμφάνιση ${from} - ${to} από ${total} πελάτες`}
                        />
                    </>
                    : <Notice>Δεν βρέθηκαν πρότζεκτ</Notice>}
            </div>

            <Link
                href={create().url}
                className="fixed bottom-5 right-5 inline-flex justify-center items-center cursor-pointer rounded-full py-2 px-5 text-sm font-medium gap-2 bg-primary text-white z-5"
            >
                Προσθήκη πρότζεκτ
                <Plus />
            </Link>
        </AppLayout >
    )
}

export default ProjectsPage