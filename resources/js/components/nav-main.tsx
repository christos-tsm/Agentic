import { Link } from '@inertiajs/react';
import { Mail, UserPlus } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { create, index } from "@/routes/invitations"
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0 gap-1">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarGroupLabel>Χρήστες</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        isActive={isCurrentUrl(index().url)}
                        tooltip={'Προσκλήσεις'}
                    >
                        <Link href={index().url} prefetch>
                            <Mail />
                            <span>Προσκλήσεις</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        isActive={isCurrentUrl(create().url)}
                        tooltip={'Πρόσκληση χρήστη'}
                    >
                        <Link href={create().url} prefetch>
                            <UserPlus />
                            <span>Πρόσκληση χρήστη</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
