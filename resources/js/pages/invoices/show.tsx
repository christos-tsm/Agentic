import React from 'react'
import AppLayout from '@/layouts/app-layout';
import { Invoice } from '@/types/invoices'
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index } from '@/routes/invoices';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Τιμολόγια',
        href: index().url,
    },
    {
        title: 'Στοιχεία τιμολογίου',
        href: '#!',
    },
];

const ShowInvoicePage = ({ invoice }: { invoice: Invoice }) => {
    const { client, project } = invoice;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Τιμολόγιο ${invoice.invoice_number}`} />

            <div className="bg-white p-5 rounded w-full h-full flex flex-col gap-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl">{invoice.invoice_number}</h2>
                    <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                        {invoice.status === 'paid' ? 'Πληρωμένο' : invoice.status === 'unpaid' ? 'Απλήρωτο' : invoice.status}
                    </span>
                </div>

                {/* Invoice details */}
                <div className="grid grid-cols-4 gap-2">
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Ποσό</span>
                        <span className="font-semibold text-lg">{invoice.amount} €</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Ημερομηνία έκδοσης</span>
                        <span className="font-medium text-sm">{formatDate(invoice.created_at) ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Προθεσμία πληρωμής</span>
                        <span className="font-medium text-sm">{formatDate(invoice.due_date) ?? '—'}</span>
                    </div>
                </div>

                {/* Divider - Client */}
                <div className="flex items-center gap-5">
                    <h2 className="font-medium text-nowrap text-foreground text-sm">Στοιχεία Πελάτη</h2>
                    <span className="h-px bg-foreground/20 flex-1"></span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Όνομα</span>
                        <span className="font-medium text-sm">{client.name}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Email</span>
                        <span className="font-medium text-sm">{client.email}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Τηλέφωνο</span>
                        <span className="font-medium text-sm">{client.phone ?? '—'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Κατάσταση</span>
                        <span className="font-medium text-sm">{client.status === 'active' ? 'Ενεργός' : 'Ανενεργός'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Επιχείρηση</span>
                        <span className="font-medium text-sm">{client.is_company ? 'Ναι' : 'Όχι'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Διεύθυνση</span>
                        <span className="font-medium text-sm">{client.address ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Πόλη</span>
                        <span className="font-medium text-sm">{client.city ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Ταχ. Κώδικας</span>
                        <span className="font-medium text-sm">{client.zip_code ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Χώρα</span>
                        <span className="font-medium text-sm">{client.country ?? '—'}</span>
                    </div>
                </div>

                {/* Divider - Company */}
                <div className="flex items-center gap-5">
                    <h2 className="font-medium text-nowrap text-foreground text-sm">Στοιχεία Εταιρείας</h2>
                    <span className="h-px bg-foreground/20 flex-1"></span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Όνομα εταιρείας/επιχείρησης</span>
                        <span className="font-medium text-sm">{client.company_name ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Email εταιρείας/επιχείρησης</span>
                        <span className="font-medium text-sm">{client.company_email ?? '—'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">Επάγγελμα</span>
                        <span className="font-medium text-sm">{client.profession ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">ΔΟΥ</span>
                        <span className="font-medium text-sm">{client.doy ?? '—'}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-foreground/60">ΑΦΜ</span>
                        <span className="font-medium text-sm">{client.vat_number ?? '—'}</span>
                    </div>
                </div>

                {/* Divider - Project */}
                {project && (
                    <>
                        <div className="flex items-center gap-5">
                            <h2 className="font-medium text-nowrap text-foreground text-sm">Στοιχεία Έργου</h2>
                            <span className="h-px bg-foreground/20 flex-1"></span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            <div className="grid gap-1">
                                <span className="text-sm text-foreground/60">Τίτλος</span>
                                <span className="font-medium text-sm">{project.title}</span>
                            </div>
                            <div className="grid gap-1">
                                <span className="text-sm text-foreground/60">Κατάσταση</span>
                                <span className="font-medium text-sm">{project.status}</span>
                            </div>
                            <div className="grid gap-1">
                                <span className="text-sm text-foreground/60">Προϋπολογισμός</span>
                                <span className="font-medium text-sm">{project.budget} €</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            <div className="grid gap-1">
                                <span className="text-sm text-foreground/60">Περιγραφή</span>
                                <span className="font-medium text-sm">{project.description ?? '—'}</span>
                            </div>
                            <div className="grid gap-1">
                                <span className="text-sm text-foreground/60">Προθεσμία</span>
                                <span className="font-medium text-sm">{project.deadline_at ?? '—'}</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4">
                    <Link href={index().url}>
                        <Button variant="outline">Πίσω στα τιμολόγια</Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowInvoicePage;