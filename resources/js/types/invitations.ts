import { PaginatedResponse } from ".";
import { Role } from "./roles";

export type Invitation = {
    created_at: string;
    email: string;
    expires_at: string | null;
    id: number;
    invitation_token: string;
    registered_at: string | null;
    role: Role;
    updated_at: string;
};

export type InvitationsPageData = PaginatedResponse<Invitation>;