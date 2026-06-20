import type { SectionContent } from "@/entities/post/model/post.type";

type ParsedPostMarkdown = {
    title: string;
    summary: string;
    rows: SectionContent[][];
};

type MarkdownBlockMode = NonNullable<SectionContent["blockMode"]>;

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const inlineMarkdownToHtml = (value: string) => {
    const codeValues: string[] = [];
    const escaped = escapeHtml(value).replace(/`([^`]+)`/g, (_, code: string) => {
        codeValues.push(`<code>${code}</code>`);
        return `%%INLINE_CODE_${codeValues.length - 1}%%`;
    });

    return escaped
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/%%INLINE_CODE_(\d+)%%/g, (_, index: string) => codeValues[Number(index)]);
};

const markdownLinesToHtml = (sourceLines: string[]) => {
    const lines = sourceLines.flatMap((line) => line.replace(/<br\s*\/?>/gi, "\n").split("\n"));
    const html: string[] = [];
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];

        if (!line.trim() || /^---+$/.test(line.trim()) || /^<!--[\s\S]*-->$/.test(line.trim())) {
            index += 1;
            continue;
        }

        const fence = line.trim().match(/^```([\w-]*)/);
        if (fence) {
            const language = fence[1] || "plaintext";
            const code: string[] = [];
            index += 1;

            while (index < lines.length && !lines[index].trim().startsWith("```")) {
                code.push(lines[index]);
                index += 1;
            }

            index += 1;
            html.push(`<pre><code class="language-${escapeHtml(language)}">${escapeHtml(code.join("\n"))}</code></pre>`);
            continue;
        }

        if (/^>\s?/.test(line)) {
            const quote: string[] = [];
            while (index < lines.length && /^>\s?/.test(lines[index])) {
                quote.push(lines[index].replace(/^>\s?/, ""));
                index += 1;
            }
            html.push(`<blockquote><p>${quote.map(inlineMarkdownToHtml).join("<br>")}</p></blockquote>`);
            continue;
        }

        if (/^\s*[-*]\s+\[[ xX]\]\s+/.test(line)) {
            const items: string[] = [];
            while (index < lines.length && /^\s*[-*]\s+\[[ xX]\]\s+/.test(lines[index])) {
                const match = lines[index].match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
                if (match) {
                    items.push(`<li data-checked="${match[1].toLowerCase() === "x"}"><p>${inlineMarkdownToHtml(match[2])}</p></li>`);
                }
                index += 1;
            }
            html.push(`<ul data-type="taskList">${items.join("")}</ul>`);
            continue;
        }

        if (/^\s*[-*]\s+/.test(line)) {
            const items: string[] = [];
            while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
                items.push(`<li><p>${inlineMarkdownToHtml(lines[index].replace(/^\s*[-*]\s+/, ""))}</p></li>`);
                index += 1;
            }
            html.push(`<ul>${items.join("")}</ul>`);
            continue;
        }

        if (/^\s*\d+\.\s+/.test(line)) {
            const items: string[] = [];
            while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
                items.push(`<li><p>${inlineMarkdownToHtml(lines[index].replace(/^\s*\d+\.\s+/, ""))}</p></li>`);
                index += 1;
            }
            html.push(`<ol>${items.join("")}</ol>`);
            continue;
        }

        const paragraph: string[] = [];
        while (
            index < lines.length &&
            lines[index].trim() &&
            !/^---+$/.test(lines[index].trim()) &&
            !/^```/.test(lines[index].trim()) &&
            !/^>\s?/.test(lines[index]) &&
            !/^\s*[-*]\s+/.test(lines[index]) &&
            !/^\s*\d+\.\s+/.test(lines[index])
        ) {
            paragraph.push(lines[index]);
            index += 1;
        }
        html.push(`<p>${paragraph.map(inlineMarkdownToHtml).join("<br>")}</p>`);
    }

    return html.join("");
};

const splitTableRow = (line: string) => {
    const value = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    const cells: string[] = [];
    let cell = "";
    let inFence = false;
    let inInlineCode = false;

    for (let index = 0; index < value.length; index += 1) {
        const char = value[index];

        if (char === "\\" && value[index + 1] === "|") {
            cell += "|";
            index += 1;
            continue;
        }

        if (value.slice(index, index + 3) === "```") {
            inFence = !inFence;
            cell += "```";
            index += 2;
            continue;
        }

        if (char === "`" && !inFence) {
            inInlineCode = !inInlineCode;
            cell += char;
            continue;
        }

        if (char === "|" && !inFence && !inInlineCode) {
            cells.push(cell.trim());
            cell = "";
            continue;
        }

        cell += char;
    }

    cells.push(cell.trim());
    return cells;
};

const isTableDivider = (line: string) => {
    const cells = splitTableRow(line);
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
};

const normalizeTableCell = (cell: string) => cell.replace(/<br\s*\/?>/gi, "\n").trim();

const getTableCellHeader = (header: string) => {
    const value = header.replace(/^(왼쪽|오른쪽)\s*:\s*/, "").trim();
    return value === "왼쪽" || value === "오른쪽" ? "" : value;
};

const getBlockMode = (value: string): MarkdownBlockMode => {
    if (value === "메인") return "main";
    if (value === "코드") return "code";
    return "sub";
};

const extractBlockDirective = (value: string) => {
    const normalized = value.trimStart();
    const match = normalized.match(/^\[(통합|왼쪽|오른쪽)\/(메인|서브|코드)\]\s*/);

    return {
        content: match ? normalized.slice(match[0].length).trimStart() : normalized,
        mode: match ? getBlockMode(match[2]) : null,
    };
};

export const parsePostMarkdown = (markdown: string, idPrefix = `markdown-${Date.now()}`): ParsedPostMarkdown => {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const title =
        lines
            .find((line) => /^#\s+/.test(line))
            ?.replace(/^#\s+/, "")
            .trim() ?? "";
    const summaryLines: string[] = [];
    const firstQuoteIndex = lines.findIndex((line) => /^>\s?/.test(line));

    if (firstQuoteIndex >= 0) {
        for (let index = firstQuoteIndex; index < lines.length && /^>\s?/.test(lines[index]); index += 1) {
            summaryLines.push(lines[index].replace(/^>\s?/, "").trim());
        }
    }

    let idIndex = 0;
    const createBlock = (data: Partial<SectionContent>): SectionContent => ({
        id: `${idPrefix}-${idIndex++}`,
        type: 0,
        title: "",
        subtitle: "",
        summary: "",
        content: "",
        imageUrl: "",
        blockMode: "sub",
        ...data,
    });

    const createTableCellBlock = (header: string, cell: string) => {
        const directive = extractBlockDirective(normalizeTableCell(cell));
        const normalizedCell = directive.content;
        const codeFence = normalizedCell.match(/(?:^|\n)```([\w-]*)\s*\n([\s\S]*?)\n```(?:$|\n)/);

        if (directive.mode === "code" || (!directive.mode && codeFence)) {
            const language = codeFence?.[1] || "plaintext";
            const code = codeFence?.[2] ?? normalizedCell;
            const label = codeFence ? normalizedCell.slice(0, codeFence.index).trim() : "";

            return createBlock({
                title: label || getTableCellHeader(header),
                content: `<pre><code class="language-${escapeHtml(language)}">${escapeHtml(code)}</code></pre>`,
                blockMode: "code",
            });
        }

        if (directive.mode === "main") {
            return createBlock({
                content: markdownLinesToHtml(normalizedCell.split("\n")),
                blockMode: "main",
            });
        }

        const heading = normalizedCell.match(/^#{1,6}\s+(.+?)(?:\n|$)([\s\S]*)$/);
        if (!directive.mode && heading) {
            return createBlock({
                title: heading[1].trim(),
                content: markdownLinesToHtml(heading[2].split("\n")),
                blockMode: "main",
            });
        }

        return createBlock({
            content: directive.mode ? markdownLinesToHtml(normalizedCell.split("\n")) : `<p><strong>${inlineMarkdownToHtml(header)}</strong></p>${markdownLinesToHtml(normalizedCell.split("\n"))}`,
            blockMode: "sub",
        });
    };

    const rows: SectionContent[][] = [];
    let hasSection = false;
    let sectionTitle = "";
    let sectionLines: string[] = [];
    let sectionMode: MarkdownBlockMode = "main";

    const appendSection = () => {
        if (!hasSection) return;

        let chunk: string[] = [];
        let isFirstChunk = true;
        let sectionSubtitle = "";

        const appendChunk = () => {
            if (isFirstChunk) {
                const subtitleIndex = chunk.findIndex((line) => /^부제목:\s*/.test(line.trim()));
                if (subtitleIndex >= 0) {
                    sectionSubtitle = chunk[subtitleIndex].trim().replace(/^부제목:\s*/, "");
                    chunk.splice(subtitleIndex, 1);
                }
            }

            const content = markdownLinesToHtml(chunk);
            if (!content && !isFirstChunk) {
                chunk = [];
                return;
            }

            rows.push([
                createBlock({
                    title: isFirstChunk && sectionMode === "main" ? sectionTitle : "",
                    subtitle: isFirstChunk && sectionMode === "main" ? sectionSubtitle : "",
                    content,
                    blockMode: isFirstChunk ? sectionMode : "sub",
                }),
            ]);
            isFirstChunk = false;
            chunk = [];
        };

        for (let index = 0; index < sectionLines.length; index += 1) {
            const headerCells = sectionLines[index].includes("|") ? splitTableRow(sectionLines[index]) : [];
            const hasTable = headerCells.length === 2 && index + 1 < sectionLines.length && isTableDivider(sectionLines[index + 1]);

            if (!hasTable) {
                chunk.push(sectionLines[index]);
                continue;
            }

            appendChunk();
            index += 2;

            while (index < sectionLines.length && sectionLines[index].includes("|")) {
                let tableRow = sectionLines[index];

                while ((!tableRow.trim().endsWith("|") || splitTableRow(tableRow).length < 2) && index + 1 < sectionLines.length) {
                    index += 1;
                    tableRow += `\n${sectionLines[index]}`;
                }

                const cells = splitTableRow(tableRow);
                if (cells.length === 2) {
                    rows.push(cells.map((cell, cellIndex) => createTableCellBlock(headerCells[cellIndex], cell)));
                }
                index += 1;
            }

            index -= 1;
        }

        if (chunk.some((line) => line.trim() && !/^---+$/.test(line.trim()) && !/^<!--/.test(line.trim())) || isFirstChunk) {
            appendChunk();
        }

        hasSection = false;
    };

    for (const line of lines) {
        const directive = line.trim().match(/^\[통합\/(메인|서브|코드)\]$/);
        if (directive) {
            appendSection();
            hasSection = true;
            sectionTitle = "";
            sectionLines = [];
            sectionMode = getBlockMode(directive[1]);
            continue;
        }

        const heading = line.match(/^##\s+(.+)$/);
        if (heading) {
            if (hasSection && !sectionTitle && sectionLines.every((sectionLine) => !sectionLine.trim())) {
                sectionTitle = heading[1].trim();
                sectionLines = [];
                continue;
            }

            appendSection();
            hasSection = true;
            sectionTitle = heading[1].trim();
            sectionLines = [];
            sectionMode = "main";
            continue;
        }

        if (hasSection) {
            sectionLines.push(line);
        }
    }
    appendSection();

    return {
        title,
        summary: summaryLines.join(" "),
        rows,
    };
};
