export const ErrorCodes = {
    WEATHER_DATA_NOT_FOUND: 'WEATHER_DATA_NOT_FOUND',
    WEATHER_API_TIMEOUT: 'WEATHER_API_TIMEOUT',
    WEATHER_API_ERROR: 'WEATHER_API_ERROR',
    WEATHER_API_GATEWAY_ERROR: 'WEATHER_API_GATEWAY_ERROR',
    WEATHER_CALCULATION_EXCEPTION: 'WEATHER_CALCULATION_EXCEPTION',
    CONFIGURATION_ERROR: 'CONFIGURATION_ERROR'
} as const;

export type ErrorCodes = typeof ErrorCodes[keyof typeof ErrorCodes];

export const ERROR_MESSAGES = {
    [ErrorCodes.WEATHER_DATA_NOT_FOUND]: {
        title: 'Brak danych',
        message: 'Nie znaleziono danych pogodowych dla wybranej lokalizacji.',
        retry: true
    },
    [ErrorCodes.WEATHER_API_TIMEOUT]: {
        title: 'Przekroczono czas oczekiwania',
        message: 'Sprawdź połączenie internetowe i spróbuj ponownie.',
        retry: true
    },
    [ErrorCodes.WEATHER_API_ERROR]: {
        title: 'Błąd serwisu',
        message: 'Wystąpił tymczasowy problem. Spróbuj ponownie za chwilę.',
        retry: true
    },
    [ErrorCodes.WEATHER_API_GATEWAY_ERROR]: {
        title: 'Problem z połączeniem',
        message: 'Sprawdź połączenie internetowe.',
        retry: true
    },
    [ErrorCodes.WEATHER_CALCULATION_EXCEPTION]: {
        title: 'Błąd przetwarzania',
        message: 'Spróbuj błąd przetwarzania obliczeń',
        retry: false
    },
    [ErrorCodes.CONFIGURATION_ERROR]: {
        title: 'Błąd konfiguracji',
        message: 'Usługa jest tymczasowo niedostępna.',
        retry: false
    }
} as const;

export const DEFAULT_ERROR = {
    title: 'Wystąpił błąd',
    message: 'Spróbuj ponownie lub skontaktuj się z pomocą techniczną.',
    retry: true
};