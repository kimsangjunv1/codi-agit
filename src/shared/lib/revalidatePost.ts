import { revalidatePath } from "next/cache";

export const revalidatePostPages = (postIdx: number | string) => {
    revalidatePath(`/post/${postIdx}`);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
};
