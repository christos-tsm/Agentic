<?php

namespace App\Services;

use App\Models\Project;
use App\Repositories\ProjectRepository;
use Illuminate\JsonSchema\Types\BooleanType;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Boolean;

class ProjectService {
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository) {
        $this->projectRepository = $projectRepository;
    }

    public function createNewProject(array $data): Project | false {
        try {
            Log::info('New project: ' . $data['title']);
            return $this->projectRepository->create($data);
        } catch (\Exception $e) {
            Log::error('Failed to delete project: ' . $e->getMessage());
            return false;
        }
    }

    public function getProjects(?string $search, ?string $status = null) {
        return $this->projectRepository->getAllPaginated(12, $search, $status);
    }

    public function updateProject(Project $project, array $data) {
        try {
            Log::info('Project updated: ' . $project->id);
            $this->projectRepository->update($project, $data);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to update project: ' . $e->getMessage());
            return false;
        }
    }

    public function deleteProject(Project $project): bool {
        try {
            Log::info('Project deleted: ' . $project->id);
            $this->projectRepository->delete($project);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete project: ' . $e->getMessage());
            return false;
        }
    }
}
