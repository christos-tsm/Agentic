import { Head, Link } from "@inertiajs/react"
import { File } from "lucide-react";
import ClientForm from "@/components/forms/ClientForm";
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes";
import { index as clientsIndex } from "@/routes/clients"
import type { BreadcrumbItem } from "@/types";
import type { Client } from "@/types/clients";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Πελάτες',
        href: clientsIndex().url,
    },
    {
        title: 'Στοιχεία πελάτη & Επεξεργασία',
        href: '#!',
    },
];

const ShowClientPage = ({ client }: { client: Client }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Στοιχεία πελάτη & Επεξεργασία" />
            <div className="flex gap-2 my-5">
                <Link href={'#!'} className="flex items-center gap-2 p-4 border border-gray-200 font-medium rounded text-sm transition-colors hover:border-primary hover:bg-primary hover:text-white duration-300">
                    <File />
                    Δημιουργία τιμολογίου για τον πελάτη: <strong>{client.name}</strong>
                </Link>
                <Link href={'#!'} className="flex items-center gap-2 p-4 border border-gray-200 font-medium rounded text-sm transition-colors hover:border-primary hover:bg-primary hover:text-white duration-300">
                    <File />
                    Δημιουργία πρότζεκτ για τον πελάτη: <strong>{client.name}</strong>
                </Link>
            </div>
            <ClientForm client={client} />
        </AppLayout>
    )
}

export default ShowClientPage