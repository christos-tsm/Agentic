// hooks/use-flash-messages.ts
import { usePage } from '@inertiajs/react'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export function useFlashMessages() {
    const { message, status } = usePage<{
        message?: string | null;
        status?: string | null;
    }>().props;

    const prevMessage = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (message && status && message !== prevMessage.current) {
            if (status === 'success') {
                toast.success(message);
            } else {
                toast.error(message);
            }
            prevMessage.current = message;
        }
    }, [message, status])
}