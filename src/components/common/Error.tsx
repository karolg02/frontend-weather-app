import '../../styles/error.css';
import { ERROR_MESSAGES, DEFAULT_ERROR, ErrorCodes } from '../../types/errorCodes';

interface ApiError {
    type: ErrorCodes;
    details: string[];
}

interface ErrorMessageProps {
    message?: string;
    error?: ApiError;
    onRetry?: () => void;
}

export const ErrorMessage = ({ message, error, onRetry }: ErrorMessageProps) => {
    if (error) {
        const errorConfig = ERROR_MESSAGES[error.type] || DEFAULT_ERROR;

        return (
            <div className="error-container" role="alert">
                <h3 className="error-title">{errorConfig.title}</h3>
                <p className="error-message">{errorConfig.message}</p>

                {error.details && error.details.length > 0 && (
                    <div className="error-details">
                        <p className="error-details-title">Szczegóły:</p>
                        <ul className="error-details-list">
                            {error.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {errorConfig.retry && onRetry && (
                    <button onClick={onRetry} className="retry-button">
                        Spróbuj ponownie
                    </button>
                )}
            </div>
        );
    }
    return (
        <div className="error-container" role="alert">
            <p className="error-message">{message || 'Wystąpił nieoczekiwany błąd'}</p>
            {onRetry && (
                <button onClick={onRetry} className="retry-button">
                    Spróbuj ponownie
                </button>
            )}
        </div>
    );
};