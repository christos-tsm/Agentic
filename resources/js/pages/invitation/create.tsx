import AppLayout from '@/layouts/app-layout'
import { Form, Head } from '@inertiajs/react'
import { BreadcrumbItem } from '@/types/navigation';
import { dashboard } from '@/routes';
import { store } from '@/routes/invitations';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Role, RoleLabels } from '@/types/roles';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Πρόσκληση χρήστη',
        href: "#!",
    },
];

const CreateInvitationPage = ({ roles }: { roles: Role[] }) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Πρόσκληση χρήστη" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Πρόσκληση χρήστη</h1>
                <Form {...store.form()}>
                    {({ processing, errors }) => (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" id="email" placeholder="Email για πρόσκληση" type="email" />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid gap-2 [&>button]:max-w-full">
                                    <Label htmlFor="role">Ρόλος</Label>
                                    <Select name="role" defaultValue={roles[0]}>
                                        <SelectTrigger className="w-full max-w-48" id="role">
                                            <SelectValue placeholder="Επιλογή" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            <SelectGroup className="w-full">
                                                {roles.map((role) => (
                                                    <SelectItem key={role} value={role}>
                                                        {RoleLabels[role]}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>
                            </div>
                            <Button disabled={processing}>Αποστολή</Button>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    )
}

export default CreateInvitationPage