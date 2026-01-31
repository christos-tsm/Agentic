import { Clients } from "./clients";
import type { PaginatedResponse } from './index';

export const PROJECTS_STATUS = ['backlog', 'in_progress', 'completed', 'on_hold'] as const;

export type ProjectsStatus = typeof PROJECTS_STATUS[number];

export type Projects = {
    id: number;
    title: string;
    client_id: number;
    client: Clients;
    description: string;
    status: ProjectsStatus;
    budget: number;
    deadline_at: string;
};

export type ProjectsPageData = PaginatedResponse<Projects>;