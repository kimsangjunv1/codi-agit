"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Highlight } from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useRef } from "react";

import TipTapBubbleMenu from "@/shared/ui/layout/TipTapBubbleMenu";
import TipTapImageBubbleMenu from "@/shared/ui/layout/TipTapImageBubbleMenu";
import TipTapToolbar from "@/shared/ui/layout/TipTapToolbar";
import { TIPTAP_PROSE_CLASS } from "@/features/managePost/ui/blockEditor/blockEditorStyles";
import { ResizableImage } from "@/shared/ui/common/richText/extensions/resizableImage";

type Props = {
    content?: string;
    onChange?: (html: string) => void;
    showToolbar?: boolean;
    onEditorFocus?: (editor: Editor) => void;
    onEditorBlur?: () => void;
};

const TIPTAP_EDITOR_CLASS = ["tiptap-editor-content min-h-[12rem] outline-none focus:outline-none", TIPTAP_PROSE_CLASS, "[&_.rich-text-image-node]:w-full"].join(" ");

const TIPTAP_WRAPPER_CLASS = "min-h-[12rem] h-full rounded-[1.6rem] outline-none";

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
    const lastEmittedHtml = useRef(content);

    const editor = useEditor({
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "본문 입력",
                class: TIPTAP_EDITOR_CLASS,
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
            Underline,
            CustomTextStyle,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            ResizableImage.configure({
                allowBase64: true,
                inline: false,
            }),
        ],
        content,
        onFocus: ({ editor: currentEditor }) => onEditorFocus?.(currentEditor),
        onBlur: () => onEditorBlur?.(),
        onUpdate: ({ editor: currentEditor }) => {
            const html = currentEditor.getHTML();
            lastEmittedHtml.current = html;
            onChange?.(html);
        },
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        if (content === lastEmittedHtml.current) {
            return;
        }

        const editorHtml = editor.getHTML();
        if (content === editorHtml) {
            lastEmittedHtml.current = content;
            return;
        }

        editor.commands.setContent(content, { emitUpdate: false });
        lastEmittedHtml.current = content;
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div
            className="w-full h-full rounded-[1.2rem]"
            onClick={(e) => e.stopPropagation()}
        >
            {showToolbar ? <TipTapToolbar editor={editor} /> : null}
            <TipTapBubbleMenu editor={editor} />
            <TipTapImageBubbleMenu editor={editor} />
            <EditorContent
                editor={editor}
                className={TIPTAP_WRAPPER_CLASS}
            />
        </div>
    );
};

const Code = ({ content = "", onChange }: Props) => {
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
        <div
            className="w-full h-full rounded-[2.0rem] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <EditorContent
                editor={editor}
                className="min-h-[150px] h-full border border-gray-300 rounded p-2 font-mono bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Tab") {
                        e.preventDefault();
                        editor.chain().focus().insertContentAt(editor.state.selection.from, "\u00A0\u00A0\u00A0\u00A0").run();
                        return;
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
