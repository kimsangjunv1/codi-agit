import { supabaseAdmin } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, resolveRouteError, singleItemPagination } from "@/shared/lib/apiResponse";

const TABLE_NAME = "category";

export async function POST(req: Request) {
    const payload = await req.json();

    try {
        const supabase = supabaseAdmin();

        const { data, error } = await supabase.from(TABLE_NAME).insert(payload).select();

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
