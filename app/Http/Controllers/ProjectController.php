<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectFilterRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Requests\SearchRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller {
    public function __construct(private ProjectService $projectService) {
    }

    public function index(ProjectFilterRequest $projectFilterRequest) {
        return Inertia::render('projects/index', [
            'projects' => $this->projectService->getProjects($projectFilterRequest->search, $projectFilterRequest->status),
            'filters' => $projectFilterRequest->only(['search', 'status'])
        ]);
    }

    public function store(ProjectRequest $projectRequest) {
        $this->projectService->createNewProject($projectRequest->validated());
        return redirect()->route('projects.index')->with('message', 'Ο πελάτης δημιουργήθηκε!');
    }

    public function create() {
        return Inertia::render('projects/create', []);
    }

    public function show(Project $project) {
        return Inertia::render('projects/show', [
            'project' => $project
        ]);
    }

    public function update(ProjectRequest $projectRequest, Project $project) {
        $this->projectService->updateProject($project, $projectRequest->validated());
        return redirect()->route('projects.show', $project)->with('message', 'Το πρότζεκτ ενημερώθηκε!');
    }
}
