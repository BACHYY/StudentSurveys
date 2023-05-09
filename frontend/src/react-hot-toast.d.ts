// react-hot-toast.d.ts

import { ToastContainerProps } from 'react-hot-toast';

declare module 'react-hot-toast' {
    interface ToastContainerProps {
        // Define any additional props for the ToastContainer component here
        // For example:
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        toastWidth?: string | number;
        toastHeight?: string | number;
    }

    const ToastContainer: React.FC<ToastContainerProps>;
    export default ToastContainer;
}

declare module 'react-hot-toast' {
    interface ToastProps {
        // Define any additional props for the toast component here
        // For example:
        duration?: number;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        style?: React.CSSProperties;
    }

    interface Toast {
        success: (message: string, options?: ToastProps) => void;
        error: (message: string, options?: ToastProps) => void;
        loading: (message: string, options?: ToastProps) => void;
        dismiss: () => void;
    }

    const toast: {
        // Define the toast functions and their return types here
        success: (message: string, options?: ToastProps) => Toast;
        error: (message: string, options?: ToastProps) => Toast;
        loading: (message: string, options?: ToastProps) => Toast;
        dismiss: () => void;
    };

    export default toast;
}
