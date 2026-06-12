"use client";

import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";

type PostSaveNavButtonProps = {
    isCreate: boolean;
    isPending: boolean;
    onSave: () => void;
};

const PostSaveNavButton = ({ isCreate, isPending, onSave }: PostSaveNavButtonProps) => (
    <UI.Button
        type="button"
        disabled={isPending}
        onClick={onSave}
        className="bg-[#00000090] hover:bg-[var(--color-blue-500)] transition-colors p-[1.2rem] rounded-full flex gap-[0.8rem] items-center disabled:opacity-60"
    >
        <IconComponent
            type="outlined-arrow-below"
            alt="나가기"
            width={32}
            height={32}
            className="rotate-90 invert-100"
        />
        <p className="text-white mr-[1.6rem] text-[1.6rem] font-semibold tablet:block mobile:hidden">
            {isCreate ? "작성하기" : "수정완료"}
        </p>
    </UI.Button>
);

export default PostSaveNavButton;
