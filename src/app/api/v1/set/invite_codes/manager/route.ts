import { randomUUID } from "crypto";
import { requireAdmin } from "@/shared/lib/auth/requireSession";
import { supabaseAdmin } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, resolveRouteError, singleItemPagination } from "@/shared/lib/apiResponse";

const TABLE_NAME = "invite_codes";

export async function POST(req: Request) {
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    const { is_active, expire_at } = await req.json();

    const insertPayload = {
        code: randomUUID().slice(0, 8),
        is_used: false,
        is_active: is_active ?? true,
        expire_at: expire_at ?? null,
    };

    try {
        const supabase = supabaseAdmin();

        const { data, error } = await supabase.from(TABLE_NAME).insert(insertPayload);

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "등록성공",
            pagination: singleItemPagination(),
        });
    } catch (error: unknown) {
        const { message, status } = resolveRouteError(error);
        return apiError(message, { status });
    }
}
