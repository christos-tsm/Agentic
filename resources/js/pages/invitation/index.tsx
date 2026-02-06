import { Form, Head, router } from '@inertiajs/react';
import { RefreshCwIcon, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Notice from '@/components/ui/notice';
import { PaginationComponent } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TableContentRow from '@/components/ui/table-content-row';
import TableHeaderRow from '@/components/ui/table-header-row';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { dashboard } from "@/routes";
import { index as invitationsIndex, cancel, deleteMethod, resend } from "@/routes/invitations";
import type { BreadcrumbItem } from '@/types';
import type { InvitationsPageData } from '@/types/invitations';
import { RoleLabels } from '@/types/roles';
import type { Role } from '@/types/roles';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Προσκλήσεις',
        href: "#!",
    },
];

const InvitationsPage = ({ invitations, roles }: { invitations: InvitationsPageData, roles: Role[] }) => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [role, setRole] = useState<Role | null>(null);

    const handleFilter = () => {
        router.get(invitationsIndex().url, {
            search: search || undefined,
            status: status || undefined,
            role: role || undefined,
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
                role: role || undefined,
            }, {
                preserveState: true,
                preserveScroll: false,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Προσκλήσεις" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Email"
                        name="search"
                        id="search"
                        className="text-sm font-medium w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Select name="status" onValueChange={(e) => setStatus(e)}>
                        <SelectTrigger className="w-full max-w-48" id="status">
                            <SelectValue placeholder="Κατάσταση" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectGroup className="w-full">
                                <SelectItem value="all">Όλοι</SelectItem>
                                <SelectItem value="active">Ενεργός</SelectItem>
                                <SelectItem value="inactive">Ανενεργός</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select name="role" onValueChange={(e) => setRole(e as Role)}>
                        <SelectTrigger className="w-full max-w-48" id="role">
                            <SelectValue placeholder="Ρόλος" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectGroup className="w-full">
                                <SelectItem value="all">Όλοι</SelectItem>
                                {roles.map((role) => <SelectItem key={role} value={role}>{RoleLabels[role]}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleFilter}>
                        Αναζήτηση
                    </Button>
                </div>
                {invitations.data.length >= 1 ?
                    <>
                        <TableHeaderRow columns={7}>
                            <p>Email</p>
                            <p>Κατάσταση Πρόσκλησης</p>
                            <p>Ρόλος</p>
                            <p>Ημερομηνία αποστολής πρόσκλησης</p>
                            <p>Ημερομηνία λήξης πρόσκλησης</p>
                            <p>Ημερομηνία εγγραφής</p>
                            <p>Ενέργειες</p>
                        </TableHeaderRow>
                        {invitations.data.map((invitation) => (
                            <TableContentRow columns={7} key={invitation.id}>
                                <p className="font-bold overflow-clip text-ellipsis">{invitation.email}</p>
                                <p className={invitation.registered_at ? "text-green-600" : "text-red-400"}>{invitation.registered_at ? "Ενεργός" : "Ανενεργός"}</p>
                                <p>{RoleLabels[invitation.role]}</p>
                                <p>{formatDate(invitation.created_at)}</p>

                                <p className="flex items-start gap-2">
                                    {invitation.registered_at ? (
                                        <span className="text-green-600">Έχει γίνει εγγραφή</span>
                                    ) : (
                                        <>
                                            <span className={invitation.expires_at && new Date(invitation.expires_at) <= new Date() ? 'text-red-500' : ''}>
                                                {formatDate(invitation.expires_at!)}
                                            </span>
                                            {invitation.expires_at && new Date(invitation.expires_at) <= new Date() && (
                                                <span className="bg-red-200 text-red-500 px-2 py-0.5 rounded text-xs">Έληξε</span>
                                            )}
                                        </>
                                    )}
                                </p>
                                <p>{invitation.registered_at ? formatDate(invitation.registered_at) : "-"}</p>
                                <div className="flex flex-col gap-2">
                                    {invitation.registered_at ? "-" :
                                        <>
                                            <Form {...resend.form(invitation.id)}>
                                                {() => (
                                                    <button className="inline-flex gap-1 text-xs font-medium items-center cursor-pointer hover:text-primary duration-300 transition-colors">
                                                        <RefreshCwIcon size={14} /> Επαναποστολή mail
                                                    </button>
                                                )}
                                            </Form>
                                            {invitation.expires_at && new Date(invitation.expires_at) <= new Date() ? null :
                                                <Form {...cancel.form(invitation.id)}>
                                                    {() => (
                                                        <button className="inline-flex gap-1 text-xs font-medium items-center cursor-pointer hover:text-primary duration-300 transition-colors">
                                                            <XCircle size={14} /> Ακύρωση
                                                        </button>
                                                    )}
                                                </Form>
                                            }
                                            <Form {...deleteMethod.form(invitation.id)}>
                                                {() => (
                                                    <button className="inline-flex gap-1 text-xs font-medium items-center cursor-pointer hover:text-primary duration-300 transition-colors">
                                                        <Trash2 size={14} /> Διαγραφή
                                                    </button>
                                                )}
                                            </Form>
                                        </>
                                    }
                                </div>
                            </TableContentRow>
                        ))}
                        <PaginationComponent
                            pagination={invitations}
                            onPageChange={handlePageChange}
                            infoLabel={(from, to, total) => `Εμφάνιση ${from} - ${to} από ${total} πρόσκλησεις`}
                        />
                    </>
                    : <Notice>Δεν έχτε στείλει καμία πρόσκληση</Notice>}
            </div>
        </AppLayout>
    )
}

export default InvitationsPage