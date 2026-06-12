import { POST_NAV_ACTIONS } from "./postNavigationActions";

type PostPermissionContext = {
    userId?: string;
    userRole?: string;
    postOwnerId?: string | null;
};

export const canManagePost = ({ userId, userRole, postOwnerId }: PostPermissionContext) => {
    if (userRole === "admin") return true;
    if (!userId || !postOwnerId) return false;

    return userId === postOwnerId;
};

export const getVisiblePostNavActions = ({
    canManage,
    isLoggedIn,
}: {
    canManage: boolean;
    isLoggedIn: boolean;
}) =>
    POST_NAV_ACTIONS.filter((item) => {
        if (item.action === "share") return true;
        if (item.action === "like") return isLoggedIn;
        if (item.action === "edit" || item.action === "delete") return canManage;

        return false;
    });
