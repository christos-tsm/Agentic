import { Head, router } from "@inertiajs/react"
import { useState } from "react"
import { PaginationComponent } from "@/components/ui/pagination"
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as clientsIndex } from "@/routes/clients";
import type { BreadcrumbItem } from "@/types";
import type { ClientsPageData } from "@/types/clients";

type ClientsPageType = {
    clients: ClientsPageData;
    filters?: {
        search?: string;
        status?: 'active' | 'inactive';
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Πελάτες',
        href: clientsIndex().url,
    },
];

const ClientsPage = ({ clients, filters = {} }: ClientsPageType) => {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState<'active' | 'inactive' | ''>(filters.status || '');


    const handleFilter = () => {
        router.get(clientsIndex().url, {
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
                    <div className="border rounded border-gray-200 px-4 py-2 flex-1">
                        <input
                            type="text"
                            placeholder="Όνομα, email, τηλέφωνο"
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
                            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | '')}
                        >
                            <option value="">Όλα τα status</option>
                            <option value="active">Ενεργός</option>
                            <option value="inactive">Ανενεργός</option>
                        </select>
                    </div>
                    <button
                        onClick={handleFilter}
                        className="text-white font-medium text-sm px-4 py-2 rounded cursor-pointer bg-primary"
                    >
                        Αναζήτηση
                    </button>
                </div>
                {clients.data.length >= 1 ?
                    <>
                        <div className="min-h-[469px]">
                            <div className="grid grid-cols-6 gap-10 border-b border-b-gray-200 text-sm py-2">
                                <p>Όνομα</p>
                                <p>Όνομα εταιρείας</p>
                                <p>Email</p>
                                <p>Τηλέφωνο</p>
                                <p>Ενεργά πρότζεκτ</p>
                                <p>Status</p>
                            </div>
                            {clients.data.map(client =>
                                <div key={client.id} className="grid grid-cols-6 gap-10 text-sm odd:bg-gray-200 py-2">
                                    <p className="font-bold overflow-clip text-ellipsis">{client.name}</p>
                                    <p className="font-medium overflow-clip text-ellipsis">{client.company_name || '-'}</p>
                                    <p className="font-medium overflow-clip text-ellipsis">
                                        <a href={`mailto:${client.email}`} className="hover:text-primary transition-colors duration-300">
                                            {client.email}
                                        </a>
                                    </p>
                                    <p className="font-medium">
                                        <a href={`tel:${client.phone}`} className="hover:text-primary transition-colors duration-300">
                                            {client.phone}
                                        </a>
                                    </p>
                                    <p className="font-medium">
                                        {client.projects_count}
                                    </p>
                                    <p className={`capitalize font-bold text-5xl leading-1 flex items-center`}>
                                        <span className={`w-2 h-2 rounded-full inline-flex ${client.status === 'active' ? 'bg-green-600' : 'bg-red-400'}`}></span>
                                    </p>
                                </div>
                            )}
                        </div>
                        <PaginationComponent
                            pagination={clients}
                            onPageChange={handlePageChange}
                            infoLabel={(from, to, total) => `Εμφάνιση ${from} - ${to} από ${total} πελάτες`}
                        />
                    </>
                    : <p>Δεν βρέθηκαν πελάτες</p>}
            </div>
        </AppLayout>
    )
}

export default ClientsPage