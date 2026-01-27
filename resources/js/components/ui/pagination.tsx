import { router } from "@inertiajs/react";
import type { Pagination, PaginationLink } from "@/types";

type PaginationProps = {
    pagination: Pagination;
    onPageChange?: (url: string | null) => void;
    showInfo?: boolean;
    infoLabel?: (from: number | null, to: number | null, total: number) => string;
};

const getLabel = (label: string): string => {
    // Μετατροπή των Laravel pagination labels σε ελληνικά
    if (label === '&laquo; Previous' || label === 'Previous') {
        return 'Προηγούμενο';
    }
    if (label === 'Next &raquo;' || label === 'Next') {
        return 'Επόμενο';
    }
    // Αφαίρεση HTML entities αν υπάρχουν
    return label.replace(/&laquo;|&raquo;/g, '').trim();
};

export const PaginationComponent = ({
    pagination,
    onPageChange,
    showInfo = true,
    infoLabel,
}: PaginationProps) => {
    const handlePageChange = (url: string | null) => {
        if (url && onPageChange) {
            onPageChange(url);
        } else if (url) {
            router.get(url, {}, {
                preserveState: true,
                preserveScroll: false,
            });
        }
    };

    if (pagination.last_page <= 1) {
        return null;
    }

    const defaultInfoLabel = (from: number | null, to: number | null, total: number) => {
        return `Εμφάνιση ${from} - ${to} από ${total}`;
    };

    return (
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pagination.links.map((link: PaginationLink, index: number) => {
                        if (link.label === '...') {
                            return (
                                <span key={index} className="px-2 text-gray-400">
                                    ...
                                </span>
                            );
                        }

                        const label = getLabel(link.label);
                        const isDisabled = !link.url;

                        return (
                            <button
                                key={index}
                                onClick={() => handlePageChange(link.url)}
                                disabled={isDisabled}
                                className={`px-3 py-1 text-sm rounded ${
                                    isDisabled
                                        ? 'text-gray-400 cursor-not-allowed opacity-50'
                                        : link.active
                                            ? 'bg-primary text-white cursor-pointer'
                                            : 'cursor-pointer hover:bg-primary hover:text-white duration-300'
                                }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
            {showInfo && (
                <div className="text-sm text-gray-700">
                    {infoLabel
                        ? infoLabel(pagination.from, pagination.to, pagination.total)
                        : defaultInfoLabel(pagination.from, pagination.to, pagination.total)}
                </div>
            )}
        </div>
    );
};
