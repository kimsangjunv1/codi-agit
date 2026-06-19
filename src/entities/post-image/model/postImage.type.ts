import { ApiResponse } from "@/shared/model/common.type";
import type {
    DeleteUnusedPostImagesResult,
    PostImageInventory,
} from "@/shared/lib/image/postImageInventory";

export type GetPostImageInventoryResponse = ApiResponse<PostImageInventory>;
export type DeleteUnusedPostImagesResponse = ApiResponse<DeleteUnusedPostImagesResult>;
