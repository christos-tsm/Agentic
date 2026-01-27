<?php

namespace App\Services;

use App\Models\Project;
use App\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Log;

class ProjectService {
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository) {
        $this->projectRepository = $projectRepository;
    }

    public function createNewProject(array $data): Project {
        // send email maybe
        Log::info('New project: ' . $data['title']);
        return $this->projectRepository->create($data);
    }

    public function getProjects(?string $search, ?string $status = null) {
        return $this->projectRepository->getAllPaginated(12, $search, $status);
    }
}
