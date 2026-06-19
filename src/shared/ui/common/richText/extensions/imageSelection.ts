import type { Editor } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { type ImageAlign } from "@/shared/ui/common/richText/extensions/imageLayout";

export function getSelectedImagePosition(editor: Editor | null) {
    if (!editor) {
        return null;
    }

    const { selection } = editor.state;

    if (selection instanceof NodeSelection && selection.node.type.name === "image") {
        return selection.from;
    }

    return null;
}

export function safeSetNodeSelection(editor: Editor, position: number) {
    if (editor.isDestroyed) {
        return false;
    }

    const node = editor.state.doc.nodeAt(position);

    if (!node || node.type.name !== "image") {
        return false;
    }

    return editor.chain().setNodeSelection(position).focus(undefined, { scrollIntoView: false }).run();
}

export function applyImageAlign(editor: Editor, position: number, align: ImageAlign) {
    const node = editor.state.doc.nodeAt(position);

    if (!node || node.type.name !== "image") {
        return false;
    }

    return editor.chain().setNodeSelection(position).setImageAlign(align).focus(undefined, { scrollIntoView: false }).run();
}
