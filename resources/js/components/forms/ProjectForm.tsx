import { Form } from "@inertiajs/react"
import { store, update } from "@/routes/projects"
import { ClientsList } from "@/types/clients";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Projects } from "@/types/projects";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"

const ProjectForm = ({ project, clients }: { project?: Projects, clients: ClientsList }) => {
    return (
        <div className="bg-white p-5 rounded w-full h-full">
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-xl">{project ? 'Επεξεργασία πρότζεκτ' : 'Δημιουργία νέου πρότζεκτ'}</h2>
            </div>
            <Form
                {...(project ? update.form(project.id) : store.form())}
                resetOnSuccess={[]}
                className="flex flex-col gap-6">
                {({ processing, errors, wasSuccessful }) => (
                    <>
                        {wasSuccessful && <div className="bg-green-100 text-green-600 text-sm font-medium px-4 py-2">{project ? 'Το πρότζεκτ ανανεώθηκε επιτυχώς' : 'Το πρότζεκτ δημιουργήθηκε επιτυχώς'}</div>}
                        <div className="grid gap-6">
                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="client_id">Πελάτης</Label>
                                <Select name="client_id" defaultValue={project ? project.client_id.toString() : ''}>
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue placeholder="Επιλογή" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectGroup className="w-full">
                                            {clients && clients.data.map( client => 
                                                <SelectItem key={client.id} value={client.id.toString()}>{client.name || client.company_name}</SelectItem> )}
                                            {/* <SelectItem value="1">Άγγελος Γάσπαρη</SelectItem> */}
                                            {/* <SelectItem value="2">Ζηνοβία Νικολόπουλος</SelectItem> */}
                                            {/* <SelectItem value="7">Λαοκράτης Παπαδοπούλου</SelectItem> */}
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
                                    defaultValue={project ? project.title : ''}
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
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground outline-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={project ? project.description : ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2 [&>button]:max-w-full">
                                <Label htmlFor="status">Κατάσταση</Label>
                                <Select name="status" defaultValue={project ? project.status : ''} >
                                    <SelectTrigger className="w-full max-w-48">
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
                                    defaultValue={project ? project.budget : ''}
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
                                Create Project
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    )
}

export default ProjectForm