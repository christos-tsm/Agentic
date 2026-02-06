import React from 'react'

const TableHeaderRow = ({ children, columns, className = '' }: { children: React.ReactNode, columns: number, className?: string }) => {
    return (
        <div className={`grid grid-cols-${columns} gap-10 border-b border-b-gray-200 text-xs font-medium py-2 ${className}`}>
            {children}
        </div>
    )
}

export default TableHeaderRow