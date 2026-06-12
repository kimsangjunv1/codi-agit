import { supabaseAdmin, supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess } from "@/shared/lib/apiResponse";

export async function POST(req: Request) {
    try {
        const { postId, userId } = await req.json();
        if (!postId) {
            return apiError("postId가 필요합니다.", {
                resultCode: "BAD_REQUEST",
                status: 400,
                result: null,
            });
        }

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

        const supabase = await supabaseServer();

        const filters: string[] = [];
        if (userId) filters.push(`user_id.eq.${userId}`);
        if (ip) filters.push(`ip.eq.${ip}`);

        let existing: { id: string } | null = null;
        if (filters.length > 0) {
            const { data, error } = await supabase
                .from("likes")
                .select("id")
                .eq("post_id", postId)
                .or(filters.join(","))
                .limit(1)
                .single();

            if (error && error.code !== "PGRST116") throw error;
            existing = data;
        }

        if (!existing) {
            const admin = supabaseAdmin();

            const { error: insertError } = await admin
                .from("likes")
                .insert({ post_id: postId, user_id: userId ?? null, ip });
            if (insertError) throw insertError;

            const { data: postData, error: selectError } = await admin
                .from("posts")
                .select("likes")
                .eq("idx", postId)
                .single();
            if (selectError) throw selectError;

            const newLikes = (postData?.likes || 0) + 1;
            const { error: updateError } = await admin
                .from("posts")
                .update({ likes: newLikes })
                .eq("idx", postId);
            if (updateError) throw updateError;
        }

        return apiSuccess(
            {
                success: true,
                likesIncremented: !existing,
                alreadyLiked: !!existing,
            },
            { resultMessage: "좋아요 처리 완료", pagination: null }
        );
    } catch (err: any) {
        return apiError(err.message || "좋아요 처리 중 문제가 발생했습니다.", {
            status: err.status ?? 500,
            result: { success: false },
        });
    }
}
