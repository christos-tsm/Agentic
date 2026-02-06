import { Head, Link, router } from "@inertiajs/react"
import { Plus } from "lucide-react";
import { useState } from "react"
import Notice from "@/components/ui/notice";
import { PaginationComponent } from "@/components/ui/pagination"
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as clientsIndex, create, show } from "@/routes/clients";
import type { BreadcrumbItem } from "@/types";
import type { ClientsPageData } from "@/types/clients";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TableHeaderRow from "@/components/ui/table-header-row";
import TableContentRow from "@/components/ui/table-content-row";

type ClientsPageType = {
    clients: ClientsPageData;
    filters?: {
        search?: string;
        status?: 'active' | 'inactive' | 'all';
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
    const [status, setStatus] = useState<'active' | 'inactive' | 'all'>(filters.status || 'all');


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
                    <div className="flex-1">
                        <Input
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
                    <div className="flex-1 max-w-87 [&>button]:max-w-full">
                        <Select name="status" onValueChange={(e) => setStatus(e as "active" | "inactive" | "all")} defaultValue={status}>
                            <SelectTrigger className="w-full max-w-48" id="status">
                                <SelectValue placeholder="Κατάσταση" />
                            </SelectTrigger>
                            <SelectContent className="w-full min-w-30">
                                <SelectGroup className="w-full">
                                    <SelectItem value="all">Όλοι</SelectItem>
                                    <SelectItem value="active">Ενεργός</SelectItem>
                                    <SelectItem value="inactive">Ανενεργός</SelectItem>
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
                {clients.data.length >= 1 ?
                    <>
                        <div className="min-h-125">
                            <TableHeaderRow columns={8}>
                                <p>Όνομα</p>
                                <p>Όνομα εταιρείας</p>
                                <p>ΑΦΜ</p>
                                <p>ΔΟΥ</p>
                                <p>Email</p>
                                <p>Τηλέφωνο</p>
                                <p>Ενεργά πρότζεκτ</p>
                                <p>Κατάσταση</p>
                            </TableHeaderRow>
                            {clients.data.map(client =>
                                <TableContentRow columns={8} key={client.id}>
                                    <p className="text-nowrap font-bold overflow-clip text-ellipsis">
                                        <Link href={show(client.id)}>
                                            {client.name}
                                        </Link>
                                    </p>
                                    <p className="overflow-clip text-ellipsis">{client.company_name || '-'}</p>
                                    <p className="overflow-clip text-ellipsis">{client.vat_number || '-'}</p>
                                    <p className="overflow-clip text-ellipsis">{client.doy || '-'}</p>
                                    <p className="overflow-clip text-ellipsis">
                                        <a href={`mailto:${client.company_email ?? client.email}`} className="hover:text-primary transition-colors duration-300 underline">
                                            {client.company_email ?? client.email}
                                        </a>
                                    </p>
                                    <p>
                                        <a href={`tel:${client.phone}`} className="hover:text-primary transition-colors duration-300 underline">
                                            {client.phone}
                                        </a>
                                    </p>
                                    <p>
                                        {client.projects_count}
                                    </p>
                                    <p className="capitalize font-bold text-5xl leading-1 flex items-center">
                                        <span className={`w-2 h-2 rounded-full inline-flex ${client.status === 'active' ? 'bg-green-600' : 'bg-red-400'}`}></span>
                                    </p>
                                </TableContentRow>
                            )}
                        </div>
                        <PaginationComponent
                            pagination={clients}
                            onPageChange={handlePageChange}
                            infoLabel={(from, to, total) => `Εμφάνιση ${from} - ${to} από ${total} πελάτες`}
                        />
                    </>
                    : <Notice>Δεν βρέθηκαν πελάτες</Notice>}
            </div>
            <Link
                href={create().url}
                className="fixed bottom-5 right-5 inline-flex justify-center items-center cursor-pointer rounded-full py-2 px-5 text-sm font-medium gap-2 bg-primary text-white z-5"
            >
                Προσθήκη πελάτη
                <Plus />
            </Link>
        </AppLayout>
    )
}

export default ClientsPage