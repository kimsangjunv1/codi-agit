export const AUTH_EXPIRED_STATUSES = new Set([401, 419]);

export class ApiFetchError extends Error {
    readonly status: number;
    readonly data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = "ApiFetchError";
        this.status = status;
        this.data = data;
    }
}

export function parseApiErrorMessage(data: unknown, fallback = "API 요청에 실패했습니다."): string {
    if (typeof data === "object" && data !== null) {
        const record = data as Record<string, unknown>;

        if (typeof record.resultMessage === "string" && record.resultMessage) {
            return record.resultMessage;
        }

        if (typeof record.message === "string" && record.message) {
            return record.message;
        }
    }

    return fallback;
}

export function trackApiError(context: "server" | "client", url: string, status: number, data: unknown) {
    const message = parseApiErrorMessage(data, "요청 실패");
    console.error(`[${context}Fetch] ${status} ${url}: ${message}`);
}
