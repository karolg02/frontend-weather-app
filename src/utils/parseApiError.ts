import { ErrorCodes } from '../types/errorCodes';

interface ApiError {
    type: ErrorCodes;
    details: string[];
}

export const parseApiError = (error: any): ApiError | null => {
    if (error?.response?.data?.type && Object.values(ErrorCodes).includes(error.response.data.type)) {
        return {
            type: error.response.data.type,
            details: error.response.data.details || []
        };
    }

    if (error?.response?.status) {
        const status = error.response.status;

        switch (status) {
            case 404:
                return {
                    type: ErrorCodes.WEATHER_DATA_NOT_FOUND,
                    details: []
                };
            case 408:
            case 504:
                return {
                    type: ErrorCodes.WEATHER_API_TIMEOUT,
                    details: []
                };
            case 502:
            case 503:
                return {
                    type: ErrorCodes.WEATHER_API_GATEWAY_ERROR,
                    details: []
                };
            case 500:
            default:
                return {
                    type: ErrorCodes.WEATHER_API_ERROR,
                    details: []
                };
        }
    }

    if (error?.message) {
        const message = error.message.toLowerCase();

        if (message.includes('failed to fetch') ||
            message.includes('network error') ||
            message.includes('fetch')) {
            return {
                type: ErrorCodes.WEATHER_API_GATEWAY_ERROR,
                details: []
            };
        }

        if (message.includes('timeout')) {
            return {
                type: ErrorCodes.WEATHER_API_TIMEOUT,
                details: []
            };
        }
    }

    return null;
};