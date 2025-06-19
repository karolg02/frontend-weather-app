import '../../styles/error.css';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
    return (
        <div className="error-container" role="alert">
            <p className="error-message">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="retry-button">
                    Spróbuj ponownie
                </button>
            )}
        </div>
    );
};