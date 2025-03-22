/**
 * TypeScript definitions for Kora Payment SDK
 */

export interface CustomerDetails {
    name: string;
    email: string;
}

export interface KoraPaymentOptions {
    key: string;
    reference: string;
    amount: number;
    currency?: string;
    customer: CustomerDetails;
    notification_url?: string;
    narration?: string;
    channels?: string[];
    default_channel?: string;
    metadata?: Record<string, any>;
    containerId?: string;
    onClose?: () => void;
    onSuccess?: (data: any) => void;
    onFailed?: (data: any) => void;
    onTokenized?: (data: any) => void;
    onPending?: () => void;
    merchant_bears_cost?: boolean;
}

export default class KoraPayment {
    constructor(config?: Partial<KoraPaymentOptions>);

    /**
     * Loads the Kora payment script if not already loaded
     * @returns Promise that resolves when script is loaded
     */
    loadScript(): Promise<void>;

    /**
     * Initialize the payment gateway
     * @param options Payment configuration options
     * @returns Promise that resolves when initialized
     */
    initialize(options?: Partial<KoraPaymentOptions>): Promise<boolean>;

    /**
     * Close the payment modal programmatically
     * @returns true if modal was closed, false otherwise
     */
    close(): boolean;

    /**
     * Validate required options for payment
     * @param options Payment options to validate
     */
    private validateOptions(options: Partial<KoraPaymentOptions>): void;
}

export function createKoraPayment(config?: Partial<KoraPaymentOptions>): KoraPayment;