import { Head } from '@inertiajs/react';
import ClientForm from '@/components/forms/ClientForm';
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes';
import { index as clientsIndex } from '@/routes/clients'
import type { BreadcrumbItem } from '@/types';

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
        title: 'Δημιουργία νέου πελάτη',
        href: '#!',
    },
];

const CreateClientPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Δημιουργία Πελάτη" />
            <ClientForm />
        </AppLayout>
    )
}

export default CreateClientPage