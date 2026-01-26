import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as clientsIndex } from "@/routes/clients";
import { BreadcrumbItem } from "@/types";
import { ClientsPageData } from "@/types/clients";
import { Head } from "@inertiajs/react"

type ClientsPageType = {
    clients: ClientsPageData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Clients',
        href: clientsIndex().url,
    },
];

const ClientsPage = ({ clients }: ClientsPageType) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Clients</h1>
            </div>
        </AppLayout>
    )
}

export default ClientsPage