import { AppContent } from '@/components/app-content';
import { Toaster } from 'react-hot-toast';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';
import { useFlashMessages } from '@/hooks/use-flash-messages';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    useFlashMessages();
    return (
        <>
            <Toaster position="top-center" />
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
        </>
    );
}
