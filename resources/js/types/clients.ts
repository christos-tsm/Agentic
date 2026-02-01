import type { PaginatedResponse } from './index';

export type Client = {
    id: number;
    name: string;
    is_company: boolean;
    company_name: string;
    company_email: string;
    profession: string;
    vat_number: string;
    doy: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip_code: string;
    country: string;
    projects_count?: number;
    status: 'active' | 'inactive';
};

export type ClientsList = {
    data: Client[]
}

export type ClientsPageData = PaginatedResponse<Client>;