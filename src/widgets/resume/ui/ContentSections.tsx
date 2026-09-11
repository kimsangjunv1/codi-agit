import type { ContentSection } from "@/lib/content";

export function ContentSections({ sections, compact = false }: { sections: ContentSection[]; compact?: boolean }) {
    return (
        <div className={compact ? "space-y-[2.4rem]" : "space-y-[4rem]"}>
            {sections.map((section, sectionIndex) => (
                <section key={`${section.heading ?? "section"}-${sectionIndex}`}>
                    {section.heading ? (
                        <h2 className={compact ? "mb-[1rem] text-[1.7rem] font-semibold" : "mb-[1.6rem] text-[2.4rem] font-semibold tracking-[-0.03em]"}>{section.heading}</h2>
                    ) : null}
                    {section.paragraphs?.map((paragraph) => (
                        <p
                            className={compact ? "mb-[1.2rem] text-[1.55rem] leading-[1.75] text-[var(--adaptive-text-secondary)]" : "mb-[1.8rem] text-[1.75rem] leading-[1.8] text-[var(--adaptive-text-secondary)]"}
                            key={paragraph}
                        >
                            {paragraph}
                        </p>
                    ))}
                    {section.items ? (
                        <ul className="mt-[1.6rem] space-y-[0.9rem] pl-[2rem] text-[1.55rem] leading-[1.7] text-[var(--adaptive-text-secondary)]">
                            {section.items.map((item) => (
                                <li
                                    className="list-disc pl-[0.4rem] marker:text-[var(--adaptive-text-muted)]"
                                    key={item}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </section>
            ))}
        </div>
    );
}
