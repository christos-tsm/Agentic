import type { PaginatedResponse } from './index';

export type Clients = {
    id: number;
    name: string;
    email: string;
    company_name: string;
    phone: string;
    projects_count?: number;
    status: 'active' | 'inactive';
};

export type ClientsPageData = PaginatedResponse<Clients>;