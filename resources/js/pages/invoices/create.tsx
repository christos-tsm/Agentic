import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/invoices';
import { BreadcrumbItem } from '@/types';
import { Client } from '@/types/clients';
import { Project } from '@/types/projects';
import { Head } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

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
        title: 'Έκδοση τιμολογίου',
        href: '#!',
    },
];

type ClientWithProjects = Client & { projects: Project[] };

const CreateInvoicePage = ({ initial_client_id }: { initial_client_id?: string | number | null }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ClientWithProjects[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [selectedClient, setSelectedClient] = useState<ClientWithProjects | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string>('');

    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const availableProjects = selectedClient?.projects ?? [];
    const selectedProject = availableProjects.find(p => String(p.id) === selectedProjectId);

    // Auto-fetch client from URL param on mount
    useEffect(() => {
        if (!initial_client_id) return;

        const fetchInitialClient = async () => {
            setIsSearching(true);
            try {
                const res = await fetch(`/clients/search?q=${encodeURIComponent(String(initial_client_id))}&by_id=1`);
                const data: ClientWithProjects[] = await res.json();
                if (data.length > 0) {
                    setSelectedClient(data[0]);
                    setQuery(data[0].name);
                }
            } catch {
                // silently fail
            } finally {
                setIsSearching(false);
            }
        };

        fetchInitialClient();
    }, [initial_client_id]);

    // Search clients as user types
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setIsSearching(true);
            try {
                const res = await fetch(`/clients/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
                setIsOpen(true);
            } catch {
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelectClient = (client: ClientWithProjects) => {
        setSelectedClient(client);
        setQuery(client.name);
        setSelectedProjectId('');
        setIsOpen(false);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        // If user edits the input after selecting, clear the selection
        if (selectedClient && e.target.value !== selectedClient.name) {
            setSelectedClient(null);
            setSelectedProjectId('');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Έκδοση Τιμολογίου" />

            <div className="bg-white p-5 rounded w-full h-full">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="font-bold text-xl">Έκδοση νέου τιμολογίου</h2>
                </div>

                <Form {...store.form()} className="flex flex-col gap-6">
                    {({ processing, errors }) => (
                        <div className="grid gap-6">

                            {/* Client search + Project */}
                            <div className="grid grid-cols-2 gap-2 items-start">

                                {/* Client search */}
                                <div className="grid gap-2" ref={wrapperRef}>
                                    <Label htmlFor="client_search">Πελάτης *</Label>
                                    <input type="hidden" name="client_id" value={selectedClient?.id ?? ''} />
                                    <div className="relative">
                                        <Input
                                            id="client_search"
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Αναζήτηση πελάτη..."
                                            value={query}
                                            onChange={handleQueryChange}
                                            onFocus={() => results.length > 0 && setIsOpen(true)}
                                        />
                                        {isSearching && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Spinner />
                                            </div>
                                        )}
                                        {isOpen && results.length > 0 && (
                                            <ul className="absolute z-50 mt-1 w-full bg-white border border-border rounded shadow-md max-h-56 overflow-y-auto">
                                                {results.map(client => (
                                                    <li
                                                        key={client.id}
                                                        className="px-3 py-2 text-sm cursor-pointer hover:bg-muted flex flex-col"
                                                        onMouseDown={() => handleSelectClient(client)}
                                                    >
                                                        <span className="font-medium">{client.name}</span>
                                                        {client.company_name && (
                                                            <span className="text-xs text-muted-foreground">{client.company_name}</span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {isOpen && !isSearching && results.length === 0 && query.trim() && (
                                            <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded shadow-md px-3 py-2 text-sm text-muted-foreground">
                                                Δεν βρέθηκαν πελάτες
                                            </div>
                                        )}
                                    </div>
                                    <InputError message={errors.client_id} />
                                </div>

                                {/* Project select */}
                                <div className="grid gap-2 [&>button]:max-w-full">
                                    <Label htmlFor="project_id">Έργο *</Label>
                                    <Select
                                        name="project_id"
                                        onValueChange={setSelectedProjectId}
                                        value={selectedProjectId}
                                        disabled={!selectedClient || availableProjects.length === 0}
                                    >
                                        <SelectTrigger className="w-full" id="project_id">
                                            <SelectValue placeholder={
                                                !selectedClient
                                                    ? 'Επιλέξτε πρώτα πελάτη'
                                                    : availableProjects.length === 0
                                                        ? 'Δεν υπάρχουν έργα'
                                                        : 'Επιλογή έργου'
                                            } />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            <SelectGroup className="w-full">
                                                {availableProjects.map(project => (
                                                    <SelectItem key={project.id} value={String(project.id)}>
                                                        {project.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.project_id} />
                                </div>
                            </div>

                            {/* Invoice number + Status */}
                            <div className="grid grid-cols-2 gap-2 items-start">
                                <div className="grid gap-2 [&>button]:max-w-full">
                                    <Label htmlFor="status">Κατάσταση</Label>
                                    <Select name="status" defaultValue="unpaid">
                                        <SelectTrigger className="w-full" id="status">
                                            <SelectValue placeholder="Επιλογή" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            <SelectGroup className="w-full">
                                                <SelectItem value="unpaid">Απλήρωτο</SelectItem>
                                                <SelectItem value="paid">Πληρωμένο</SelectItem>
                                                <SelectItem value="void">Ακυρωμένο</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                            {/* Amount + Due date */}
                            <div className="grid grid-cols-2 gap-2 items-start">
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Ποσό (€) *</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        step="0.01"
                                        tabIndex={2}
                                        required
                                        key={selectedProject?.budget ?? ''}
                                        defaultValue={selectedProject?.budget ?? ''}
                                        placeholder="Επιλέξτε έργο για αυτόματη συμπλήρωση"
                                    />
                                    <InputError message={errors.amount} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="due_date">Προθεσμία πληρωμής *</Label>
                                    <Input
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        tabIndex={3}
                                        required
                                    />
                                    <InputError message={errors.due_date} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="submit-button"
                            >
                                {processing && <Spinner />}
                                Έκδοση τιμολογίου
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
};

export default CreateInvoicePage;