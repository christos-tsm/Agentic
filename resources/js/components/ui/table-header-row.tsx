import React from 'react'
import { cn, getGridColumns } from '@/lib/utils'

const TableHeaderRow = ({ children, columns, className = '' }: { children: React.ReactNode, columns: number, className?: string }) => {
    return (
        <div className={cn(
            'grid gap-10 border-b border-b-gray-200 text-xs font-medium py-2',
            getGridColumns(columns),
            className
        )}>
            {children}
        </div>
    )
}

export default TableHeaderRow