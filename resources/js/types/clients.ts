import type { PaginatedResponse } from './index';

export type Clients = {
    id: number;
    name: string;
    email: string;
    company_name: string;
    phone: string;
    status: 'active' | 'inactive';
};

export type ClientsPageData = PaginatedResponse<Clients>;