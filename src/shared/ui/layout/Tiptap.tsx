"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";
import { useEffect, useState } from "react";

import TipTapBubbleMenu from "@/shared/ui/layout/TipTapBubbleMenu";
import TipTapImageBubbleMenu from "@/shared/ui/layout/TipTapImageBubbleMenu";
import TipTapToolbar from "@/shared/ui/layout/TipTapToolbar";
import { ResizableImage } from "@/shared/ui/common/richText/extensions/resizableImage";

type Props = {
    content?: string;
    onChange?: (html: string) => void;
    showToolbar?: boolean;
    onEditorFocus?: (editor: Editor) => void;
    onEditorBlur?: () => void;
};

const CustomTextStyle = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: (element) => element.style.fontSize || null,
                renderHTML: (attributes) => {
                    if (!attributes.fontSize) return {};
                    return { style: `font-size: ${attributes.fontSize}` };
                },
            },
            lineHeight: {
                default: null,
                parseHTML: (element) => element.style.lineHeight || null,
                renderHTML: (attributes) => {
                    if (!attributes.lineHeight) return {};
                    return { style: `line-height: ${attributes.lineHeight}` };
                },
            },
        };
    },
});

const Normal = ({ content = "", onChange, showToolbar = true, onEditorFocus, onEditorBlur }: Props) => {
    const editor = useEditor({
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "본문 입력",
                class: "tiptap-editor-content min-h-[12rem] px-[0.4rem] py-[0.8rem] outline-none focus:outline-none [&_.rich-text-image-node]:w-full",
            },
        },
        extensions: [
            StarterKit.configure({
                horizontalRule: false,
                link: {
                    openOnClick: false,
                    enableClickSelection: true,
                },
            }),
            Bold,
            Italic,
            Underline,
            CustomTextStyle,
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            ResizableImage.configure({
                allowBase64: true,
                inline: false,
            }),
            Selection,
        ],
        content,
        onUpdate: ({ editor: currentEditor }) => {
            onChange?.(currentEditor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;

        const handleFocus = () => onEditorFocus?.(editor);
        const handleBlur = () => onEditorBlur?.();

        editor.on("focus", handleFocus);
        editor.on("blur", handleBlur);

        return () => {
            editor.off("focus", handleFocus);
            editor.off("blur", handleBlur);
        };
    }, [editor, onEditorFocus, onEditorBlur]);

    if (!editor) return null;

    return (
        <div className="w-full h-full rounded-[1.2rem]" onClick={(e) => e.stopPropagation()}>
            {showToolbar ? <TipTapToolbar editor={editor} /> : null}
            <TipTapBubbleMenu editor={editor} />
            <TipTapImageBubbleMenu editor={editor} />
            <EditorContent
                editor={editor}
                className="min-h-[12rem] h-full rounded-[1.6rem] outline-none [&_.tiptap-editor-content]:min-h-[12rem] [&_.tiptap-editor-content_p]:my-[0.4rem] [&_.tiptap-editor-content_ul]:list-disc [&_.tiptap-editor-content_ul]:pl-[2rem] [&_.tiptap-editor-content_ol]:list-decimal [&_.tiptap-editor-content_ol]:pl-[2rem] [&_.tiptap-editor-content_blockquote]:border-l-[0.4rem] [&_.tiptap-editor-content_blockquote]:border-[var(--color-gray-300)] [&_.tiptap-editor-content_blockquote]:pl-[1.2rem] [&_.tiptap-editor-content_blockquote]:text-[var(--color-gray-600)] [&_.rich-text-image-node]:w-full"
            />
        </div>
    );
};

const Code = ({ content = "", onChange }: Props) => {
    const [, setIsUseTab] = useState(false);
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: false,
                bold: false,
                italic: false,
                strike: false,
                code: false,
            }),
        ],
        content,
        onUpdate: ({ editor: currentEditor }) => {
            onChange?.(currentEditor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="w-full h-full rounded-[2.0rem] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <EditorContent
                editor={editor}
                className="min-h-[150px] h-full border border-gray-300 rounded p-2 font-mono bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Tab") {
                        e.preventDefault();
                        setIsUseTab(true);
                        editor.chain().focus().insertContentAt(editor.state.selection.from, "\u00A0\u00A0\u00A0\u00A0").run();
                    }

                    if (e.key === "Enter") {
                        editor.chain().focus().insertContentAt(editor.state.selection.from, "\u00A0\u00A0\u00A0\u00A0").run();
                    }
                }}
            />
        </div>
    );
};

const TipTap = {
    Normal,
    Code,
};

export default TipTap;
