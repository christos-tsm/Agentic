import { Form } from "@inertiajs/react"
import { store } from "@/routes/projects"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

const ProjectForm = () => {
    return (
        <div className="bg-white p-5 rounded w-full max-w-[650px]">
            <div className="flex justify-between items-center mb-10">
                <h2 className="font-bold text-xl">Δημιουργία νέου πρότζεκτ</h2>
            </div>
            <Form
                {...store.form()}
                resetOnSuccess={[]}
                className="flex flex-col gap-6"            >
                {({ processing, errors, wasSuccessful }) => (
                    <>
                        {wasSuccessful && <div className="bg-green-100 text-green-600 text-sm font-medium text-center py-2 mt-5">Το πρότζεκτ δημιουργήθηκε επιτυχώς</div>}
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="client_id">Client</Label>
                                <select
                                    id="client_id"
                                    name="client_id"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select a client</option>
                                    {/* Add your client options here */}
                                    <option value="1">Άγγελος Γάσπαρη</option>
                                    <option value="2">Ζηνοβία Νικολόπουλος</option>
                                    <option value="7">Λαοκράτης Παπαδοπούλου</option>
                                </select>
                                <InputError message={errors.client_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    required
                                    tabIndex={2}
                                    placeholder="Project title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    tabIndex={3}
                                    rows={4}
                                    placeholder="Project description (optional)"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    name="status"
                                    tabIndex={4}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="backlog">Backlog</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
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
                                    defaultValue="0"
                                />
                                <InputError message={errors.budget} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="deadline_at">Deadline</Label>
                                <Input
                                    id="deadline_at"
                                    type="date"
                                    name="deadline_at"
                                    tabIndex={6}
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