import { Head, Link } from '@inertiajs/react';
import { ExternalLink, Eye, Plus } from 'lucide-react';
import Notice from '@/components/ui/notice';
import TableContentRow from '@/components/ui/table-content-row';
import TableHeaderRow from '@/components/ui/table-header-row';
import AppLayout from '@/layouts/app-layout'
import { formatDate } from '@/lib/utils';
import { dashboard } from '@/routes';
import { show as clientShow } from '@/routes/clients'
import { show as projectShow } from '@/routes/projects';
import type { BreadcrumbItem } from '@/types';
import type { InvoicesPageData } from '@/types/invoices';
import { create, show } from '@/routes/invoices';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Τιμολόγια',
        href: '#!',
    },

];

const InvoicesPage = ({ invoices }: { invoices: InvoicesPageData }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {invoices.data.length >= 1 ?
                    <>
                        <div className="min-h-125">
                            <TableHeaderRow columns={6}>
                                <p>Ενέργιες</p>
                                <p>Πελάτης</p>
                                <p>Πρότζεκτ</p>
                                <p>Ποσό</p>
                                <p>Due Date</p>
                                <p>Κατάσταση</p>
                            </TableHeaderRow>
                            {invoices.data.map(invoice =>
                                <TableContentRow columns={6} key={invoice.id}>
                                    <div className="flex flex-col gap-2">
                                        <Link href={show(invoice.id)} className="inline-flex items-center gap-2 duration-300 transition-colors hover:text-primary">
                                            <Eye size={18} />
                                            Προβολή Τιμολογίου
                                        </Link>
                                    </div>
                                    <p className="font-bold">
                                        <Link href={clientShow(invoice.client.id)} className="inline-flex items-center gap-2 duration-300 transition-colors hover:text-primary">
                                            <ExternalLink size={14} />
                                            {invoice.client.company_name ?? invoice.client.name}
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href={projectShow(invoice.project.id)} className="inline-flex items-center gap-2 duration-300 transition-colors hover:text-primary">
                                            <ExternalLink size={14} />
                                            {invoice.project.title}
                                        </Link>
                                    </p>
                                    <p>{invoice.amount}</p>
                                    <p>{formatDate(invoice.due_date)}</p>
                                    <p>{invoice.status}</p>
                                </TableContentRow>
                            )}
                        </div>
                    </>
                    : <Notice>Δεν βρέθηκαν τιμολόγια</Notice>}
            </div>
            <Link
                href={create().url}
                className="fixed bottom-5 right-5 inline-flex justify-center items-center cursor-pointer rounded-full py-2 px-5 text-sm font-medium gap-2 bg-primary text-white z-5"
            >
                Έκδοση Τιμολογίου
                <Plus />
            </Link>
        </AppLayout>
    )
}

export default InvoicesPage