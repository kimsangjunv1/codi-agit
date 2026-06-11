import { clientFetch } from "@/shared/lib/api/client";

type UploadPostImageResponse = {
    resultCode: string;
    resultMessage?: string;
    result?: { url: string };
};

export const uploadPostImageFetch = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const data = await clientFetch<UploadPostImageResponse>("/api/v1/set/post/image", {
        method: "POST",
        body: formData,
    });

    if (data?.resultCode !== "SUCCESS" || !data?.result?.url) {
        throw new Error(data?.resultMessage ?? "이미지 업로드에 실패했습니다.");
    }

    return data.result.url;
};
