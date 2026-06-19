export const DRAFT_IMAGE_DRAG_MIME = "application/x-codi-post-draft-image";

export const setDraftImageDragData = (dataTransfer: DataTransfer, previewUrl: string) => {
    dataTransfer.setData(DRAFT_IMAGE_DRAG_MIME, previewUrl);
    dataTransfer.effectAllowed = "copy";
};

export const getDraftImageDragPreviewUrl = (dataTransfer: DataTransfer | null) => {
    if (!dataTransfer) {
        return null;
    }

    return dataTransfer.getData(DRAFT_IMAGE_DRAG_MIME) || null;
};
