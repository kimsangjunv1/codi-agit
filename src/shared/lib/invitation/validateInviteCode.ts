export type InviteCodeRecord = {
    id: number;
    is_active: boolean;
    is_used: boolean;
    expire_at: string | null;
};

export const INVITE_CODE_STATUS = {
    VALID: 1,
    EXPIRED: 2,
    INACTIVE: 3,
    USED: 4,
    NOT_FOUND: 5,
} as const;

export function getInviteCodeStatus(data: InviteCodeRecord | null) {
    if (!data) {
        return {
            statusCode: INVITE_CODE_STATUS.NOT_FOUND,
            resultMessage: "존재하지 않는 코드입니다",
            isValid: false,
        };
    }

    const now = new Date();
    const expireDate = data.expire_at ? new Date(data.expire_at) : null;

    if (expireDate && expireDate < now) {
        return {
            statusCode: INVITE_CODE_STATUS.EXPIRED,
            resultMessage: "코드가 만료되었습니다",
            isValid: false,
        };
    }

    if (!data.is_active) {
        return {
            statusCode: INVITE_CODE_STATUS.INACTIVE,
            resultMessage: "비활성화된 코드입니다",
            isValid: false,
        };
    }

    if (data.is_used) {
        return {
            statusCode: INVITE_CODE_STATUS.USED,
            resultMessage: "이미 사용된 코드입니다",
            isValid: false,
        };
    }

    return {
        statusCode: INVITE_CODE_STATUS.VALID,
        resultMessage: "초대코드 조회 성공",
        isValid: true,
    };
}
