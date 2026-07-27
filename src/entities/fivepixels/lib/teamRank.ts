import { FIVEPIXELS_ROLE_RANK } from "@/entities/fivepixels/constants/fivepixels.constants";
import type { ReportAuthorRole } from "@/entities/fivepixels/model/fivepixels.type";

/** 알 수 없는 값은 member 로 취급 (라이브러리 resolveAuthorRole 과 동일). */
export function resolveRoleRank(role: ReportAuthorRole | null | undefined): number {
    if (role === "admin") return FIVEPIXELS_ROLE_RANK.admin;
    if (role === "sub_admin") return FIVEPIXELS_ROLE_RANK.sub_admin;
    return FIVEPIXELS_ROLE_RANK.member;
}

/** admin / sub_admin 만 팀 관리(승인·등록·수정) 가능. */
export function canManageTeam(actorRole: ReportAuthorRole): boolean {
    return actorRole === "admin" || actorRole === "sub_admin";
}

/** 호출자 rank 가 대상(또는 부여할 role) rank 보다 엄격히 높을 때만 허용. 동급·상위 금지. */
export function outranks(actorRole: ReportAuthorRole, targetRole: ReportAuthorRole | null | undefined): boolean {
    return resolveRoleRank(actorRole) > resolveRoleRank(targetRole);
}
