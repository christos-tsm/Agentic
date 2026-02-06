import React from 'react'

const TableContentRow = ({ children, columns, className = '' }: { children: React.ReactNode, columns: number, className?: string }) => {
    return (
        <div className={`grid grid-cols-${columns} text-sm odd:bg-gray-200 py-2 text-foreground/90 ${className}`}>
            {children}
        </div>
    )
}

export default TableContentRow