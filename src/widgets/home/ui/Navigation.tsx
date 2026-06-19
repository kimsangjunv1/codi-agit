"use client";

import { GetPostLatestListResponse } from "@/entities/post/model/post.type";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

import useNavigate from "@/shared/hooks/useNavigate";
import HomeViewModeNav from "./HomeViewModeNav";

type ArchiveFeedProps = {
    initialData: GetPostLatestListResponse;
};

const Navigation = () => {
    const { currentPathName, pushToUrl } = useNavigate();
    const { isMobile } = useLayoutStore();

    const IS_ROUTE_HOME = currentPathName === "/";

    return <>{IS_ROUTE_HOME && !isMobile && <HomeViewModeNav variant="header" />}</>;
};

export default Navigation;
