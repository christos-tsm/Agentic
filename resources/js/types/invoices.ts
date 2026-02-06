import type { Client } from "./clients";
import type { Project } from "./projects";
import type { PaginatedResponse } from ".";

export type InvoiceStatus = 'unpaid' | 'paid' | 'void';

export type Invoice = {
    id: number;
    invoice_number: string;
    amount: number;
    due_date: string;
    status: InvoiceStatus;
    created_at: string;
    client: Client;
    project: Project
}

export type InvoicesPageData = PaginatedResponse<Invoice>;