import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AgitRoutes } from "@/shared/constants/entityKeys";
import { useToastStore } from "@/shared/stores/useToastStore";
import {
    deleteInvitationFetch,
    getInvitationCodeCheckFetch,
    getInvitationCodeListOnManagerFetch,
    patchInvitationFetch,
    setInvitationCodeFetch,
} from "@/entities/invitation/api/invitation.api";
import {
    DeleteInvitationCodePayload,
    GetInvitationCodeCheckResponse,
    GetInvitationCodeListOnManagerResponse,
    PatchInvitationCodePayload,
    SetInvitationCodePayload,
} from "@/entities/invitation/model/invitation.type";

export const useGetInvitationCodeCheckQuery = (code: string) => {
    const { data, isLoading, isError, isFetching, isPending, refetch } = useQuery<GetInvitationCodeCheckResponse>({
        queryKey: [AgitRoutes.KEY_INVITATION, "check", code],
        queryFn: () => getInvitationCodeCheckFetch(code),
        staleTime: 0,
        enabled: false,
    });

    return { data, isLoading, isError, isFetching, isPending, refetch };
};

export const useGetInvitationCodeListOnManagerQuery = () => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetInvitationCodeListOnManagerResponse>({
        queryKey: [AgitRoutes.KEY_INVITATION, "manager", "list"],
        queryFn: () => getInvitationCodeListOnManagerFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useSetInvitationCodeQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_INVITATION, "set"],
        mutationFn: (payload: SetInvitationCodePayload) => setInvitationCodeFetch(payload),
        onSuccess: () => {
            setToast({ msg: "초대코드를 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_INVITATION] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const usePatchInvitationCodeQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_INVITATION, "patch"],
        mutationFn: (payload: PatchInvitationCodePayload) => patchInvitationFetch(payload),
        onSuccess: () => {
            setToast({ msg: "초대코드를 수정했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_INVITATION] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useDeleteInvitationCodeQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_INVITATION, "delete"],
        mutationFn: (payload: DeleteInvitationCodePayload) => deleteInvitationFetch(payload),
        onSuccess: () => {
            setToast({ msg: "초대코드를 삭제했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_INVITATION] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
