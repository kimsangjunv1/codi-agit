import { clientApi } from "@/shared/lib/api/client";

export const uploadPostImageFetch = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/v1/set/post/image", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok || data?.resultCode !== "SUCCESS" || !data?.result?.url) {
        throw new Error(data?.resultMessage ?? "이미지 업로드에 실패했습니다.");
    }

    return data.result.url as string;
};
