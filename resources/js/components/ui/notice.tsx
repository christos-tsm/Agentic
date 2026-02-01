import React from 'react'

const Notice = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-primary text-white px-4 py-2 rounded text-sm font-medium text-center">
            {children}
        </div>
    )
}

export default Notice