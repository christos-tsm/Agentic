import { Form } from "@inertiajs/react"
import { XCircle } from "lucide-react";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Spinner } from '@/components/ui/spinner';
import { store, update, deleteMethod } from "@/routes/projects"
import type { ClientsList } from "@/types/clients";
import type { Projects } from "@/types/projects";

const ProjectForm = ({ project, clients }: { project?: Projects, clients: ClientsList }) => {
    const params = new URLSearchParams(window.location.search);
    const client_id = params.get('client_id');
    return (
        <div className="bg-white p-5 rounded w-full h-full">
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-xl">{project ? 'Επεξεργασία πρότζεκτ' : 'Δημιουργία νέου πρότζεκτ'}</h2>
                {project ?
                    <Form {...deleteMethod.form(project.id)}>
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
            <Form
                {...(project ? update.form(project.id) : store.form())}
                resetOnSuccess={[]}
                className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="client_id">Πελάτης</Label>
                                <Select name="client_id" defaultValue={project?.client_id.toString() || client_id || ''}>
                                    <SelectTrigger className="w-full max-w-48" id="client_id">
                                        <SelectValue placeholder="Επιλογή" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectGroup className="w-full">
                                            {clients && clients.data.map(client =>
                                                <SelectItem key={client.id} value={client.id.toString()}>{client.name || client.company_name}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.client_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="title">Τίτλος</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    required
                                    tabIndex={2}
                                    defaultValue={project?.title ?? ''}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Περιγραφή</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    tabIndex={3}
                                    rows={4}
                                    className="flex min-h-20 w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground outline-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={project?.description ?? ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="status">Κατάσταση</Label>
                                <Select name="status" defaultValue={project?.status || 'backlog'}>
                                    <SelectTrigger tabIndex={4} className="w-full max-w-48" id="status">
                                        <SelectValue placeholder="Επιλογή" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectGroup className="w-full">
                                            <SelectItem value="backlog">Backlog</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="on_hold">On Hold</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="budget">Budget</Label>
                                <Input
                                    id="budget"
                                    type="number"
                                    name="budget"
                                    step="0.01"
                                    min="0"
                                    tabIndex={5}
                                    placeholder="0.00"
                                    defaultValue={project?.budget ?? ''}
                                />
                                <InputError message={errors.budget} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="deadline_at">Deadline</Label>
                                <DatePicker
                                    id="deadline_at"
                                    name="deadline_at"
                                    defaultValue={project?.deadline_at || ''}
                                    placeholder="Επιλέξτε ημερομηνία"
                                />
                                <InputError message={errors.deadline_at} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={7}
                                disabled={processing}
                                data-test="submit-button"
                            >
                                {processing && <Spinner />}
                                {project ? 'Ανανέωση' : 'Δημιουργία'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    )
}

export default ProjectForm