<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectFilterRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Services\ClientService;
use App\Services\ProjectService;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct(private ProjectService $projectService, private ClientService $clientService) {}

    public function index(ProjectFilterRequest $projectFilterRequest)
    {
        return Inertia::render('projects/index', [
            'projects' => $this->projectService->getProjects($projectFilterRequest->search, $projectFilterRequest->status),
            'filters' => $projectFilterRequest->only(['search', 'status'])
        ]);
    }

    public function store(ProjectRequest $projectRequest)
    {
        $this->projectService->createNewProject($projectRequest->validated());
        return redirect()->route('projects.index')->with('message', 'Το πρότζεκτ δημιουργήθηκε!');
    }

    public function create()
    {
        $clients = $this->clientService->getClientsForDashboard('', null);
        return Inertia::render('projects/create', [
            'clients' => $clients
        ]);
    }

    public function show(Project $project)
    {
        $clients = $this->clientService->getClientsForDashboard('', null);
        return Inertia::render('projects/show', [
            'project' => $project,
            'clients' => $clients
        ]);
    }

    public function update(ProjectRequest $projectRequest, Project $project)
    {
        $this->projectService->updateProject($project, $projectRequest->validated());
        return redirect()->route('projects.show', $project)->with('message', 'Το πρότζεκτ ενημερώθηκε!');
    }

    public function delete(Project $project)
    {
        $this->projectService->deleteProject($project);
        return redirect()->route('projects.index')->with('message', 'Το πρότζεκτ διαγράφηκε');
    }
}
