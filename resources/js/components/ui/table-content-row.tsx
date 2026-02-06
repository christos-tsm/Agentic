import React from 'react'
import { cn, getGridColumns } from '@/lib/utils'

const TableContentRow = ({ children, columns, className = '' }: { children: React.ReactNode, columns: number, className?: string }) => {
    return (
        <div className={cn(
            'grid gap-10 text-sm odd:bg-gray-200 py-2 text-foreground/90',
            getGridColumns(columns),
            className
        )}>
            {children}
        </div>
    )
}

export default TableContentRow