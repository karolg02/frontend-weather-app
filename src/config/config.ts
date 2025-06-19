interface AppConfig {
    apiBaseUrl: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

class ConfigService {
    private config: AppConfig;

    constructor() {
        this.config = {
            apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
            isDevelopment: import.meta.env.DEV,
            isProduction: import.meta.env.PROD,
        };

        if (this.config.isDevelopment) {
            this.validateConfig();
        }
    }

    get apiBaseUrl(): string {
        return this.config.apiBaseUrl;
    }

    get isDevelopment(): boolean {
        return this.config.isDevelopment;
    }

    get isProduction(): boolean {
        return this.config.isProduction;
    }

    private validateConfig(): void {
        if (!this.config.apiBaseUrl) {
            console.warn('VITE_API_BASE_URL not set, using default localhost:3000');
        }
    }
}

export const configService = new ConfigService();