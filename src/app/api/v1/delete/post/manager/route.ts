import { requirePostOwnerOrAdmin } from "@/shared/lib/auth/requireSession";
import { supabaseAdmin } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/shared/lib/apiResponse";
import { revalidatePostPages } from "@/shared/lib/revalidatePost";

const TABLE_POST = "posts";
const TABLE_COMMENT = "comments";
const TABLE_VIEW = "views";
const TABLE_LIKE = "likes";

export async function DELETE(req: Request) {
    const payload = await req.json();
    const idx = payload.idx;

    if (!idx) {
        return apiError("게시물 번호가 필요합니다", { status: 400 });
    }

    const auth = await requirePostOwnerOrAdmin(idx);
    if (!auth.authorized) return auth.response;

    try {
        const supabase = supabaseAdmin();

        const { error: commentError } = await supabase.from(TABLE_COMMENT).delete().eq("post_id", idx);
        if (commentError) throw commentError;

        const { error: viewError } = await supabase.from(TABLE_VIEW).delete().eq("post_id", idx);
        if (viewError) throw viewError;

        const { error: likeError } = await supabase.from(TABLE_LIKE).delete().eq("post_id", idx);
        if (likeError) throw likeError;

        const { data, error } = await supabase.from(TABLE_POST).delete().eq("idx", idx).select();

        if (error) throw error;

        revalidatePostPages(idx);

        return apiSuccess(data, {
            resultMessage: "게시물을 삭제했어요.",
            pagination: singleItemPagination(),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "문제가 생겼습니다";
        const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : 500;

        return apiError(message, {
            status: Number.isFinite(status) ? status : 500,
        });
    }
}
