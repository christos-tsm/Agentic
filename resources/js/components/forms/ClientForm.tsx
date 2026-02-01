import { Form } from '@inertiajs/react'
import { XCircle } from 'lucide-react'
import { useState } from 'react'
import clients, { deleteMethod, store } from '@/routes/clients'
import type { Client } from '@/types/clients'
import InputError from '../input-error'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Spinner } from '../ui/spinner'

const ClientForm = ({ client }: { client?: Client }) => {
    const [isCompany, setIsCompany] = useState<boolean>(client ? client.is_company : true);

    return (
        <div className="bg-white p-5 rounded w-full h-full">
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-xl">{client ? 'Επεξεργασία πελάτη' : 'Δημιουργία νέου πελάτη'}</h2>
                {client ?
                    <Form {...deleteMethod.form(client.id)}>
                        {({ processing }) => (
                            <>
                                <button disabled={processing} className="bg-red-400 inline-flex gap-2 items-center text-white text-sm font-medium px-2 py-1 leading-1 rounded">
                                    Διαγραφή
                                    <XCircle />
                                </button>
                            </>
                        )}
                    </Form>
                    : null}
            </div>
            <Form {...(client ? clients.update.form(client.id) : store.form())}
                resetOnSuccess={[]}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid grid-cols-3 gap-2 items-start">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Όνομα *</Label>
                                <Input id="name" type="text" name="name" tabIndex={1} required defaultValue={client ? client.name : ''} />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="status">Κατάσταση</Label>
                                <Select name="status" defaultValue={client ? client.status : 'active'}>
                                    <SelectTrigger className="w-full max-w-48" id="status">
                                        <SelectValue placeholder="Επιλογή" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectGroup className="w-full">
                                            <SelectItem value="active">Ενεργός</SelectItem>
                                            <SelectItem value="inactive">Ανενεργός</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="is_company">Επιχείρηση</Label>
                                <Select onValueChange={(e) => setIsCompany(e === '1')} name="is_company" defaultValue={client ? client.is_company ? '1' : '0' : '1'}>
                                    <SelectTrigger className="w-full max-w-48" id="is_company">
                                        <SelectValue placeholder="Επιλογή" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectGroup className="w-full">
                                            <SelectItem value="1">Ναι</SelectItem>
                                            <SelectItem value="0">Όχι</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.is_company} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-start">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" type="email" name="email" tabIndex={2} required defaultValue={client ? client.email : ''} />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Τηλέφωνο</Label>
                                <Input id="phone" type="text" name="phone" tabIndex={3} defaultValue={client ? client.phone : ''} />
                                <InputError message={errors.phone} />
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 items-start">
                            <div className="grid gap-2">
                                <Label htmlFor="address">Διεύθυνση</Label>
                                <Input id="address" type="text" name="address" tabIndex={9} defaultValue={client ? client.address : ''} />
                                <InputError message={errors.address} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">Πόλη</Label>
                                <Input id="city" type="text" name="city" tabIndex={10} defaultValue={client ? client.city : ''} />
                                <InputError message={errors.city} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="zip_code">Ταχ.Κώδικας</Label>
                                <Input id="zip_code" type="text" name="zip_code" tabIndex={11} defaultValue={client ? client.zip_code : ''} />
                                <InputError message={errors.zip_code} />
                            </div>
                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="country">Χώρα</Label>
                                <Select name="country" defaultValue={client ? client.country : ''}>
                                    <SelectTrigger className="w-full max-w-48" id="country">
                                        <SelectValue placeholder="Επιλογή" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectGroup className="w-full">
                                            <SelectItem value="Ελλάδα">Ελλάδα</SelectItem>
                                            <SelectItem value="Κύπρος">Κύπρος</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.country} />
                            </div>
                        </div>
                        <div className="my-5 flex items-center gap-5">
                            <h2 className="font-medium text-nowrap text-foreground text-sm">Στοιχεία Εταιρείας</h2>
                            <span className="h-px bg-foreground/20 flex-1"></span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-start">
                            <div className="grid gap-2">
                                <Label htmlFor="company_name">Όνομα εταιρείας/επιχείρησης</Label>
                                <Input disabled={!isCompany} id="company_name" type="text" name="company_name" tabIndex={4} defaultValue={client ? client.company_name : ''} />
                                <InputError message={errors.company_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company_email">Email εταιρείας/επιχείρησης</Label>
                                <Input disabled={!isCompany} id="company_email" type="text" name="company_email" tabIndex={5} defaultValue={client ? client.company_email : ''} />
                                <InputError message={errors.company_email} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-start">
                            <div className="grid gap-2">
                                <Label htmlFor="profession">Επάγγελμα</Label>
                                <Input disabled={!isCompany} id="profession" type="text" name="profession" tabIndex={6} defaultValue={client ? client.profession : ''} />
                                <InputError message={errors.profession} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="doy">ΔΟΥ</Label>
                                <Input disabled={!isCompany} id="doy" type="text" name="doy" tabIndex={7} defaultValue={client ? client.doy : ''} />
                                <InputError message={errors.doy} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="vat_number">ΑΦΜ</Label>
                                <Input disabled={!isCompany} id="vat_number" type="text" name="vat_number" tabIndex={8} defaultValue={client ? client.vat_number : ''} />
                                <InputError message={errors.vat_number} />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={6}
                            disabled={processing}
                            data-test="submit-button"
                        >
                            {processing && <Spinner />}
                            {client ? 'Ανανέωση' : 'Δημιουργία'}
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default ClientForm