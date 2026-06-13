import { resumeTechStack } from "@/shared/constants/resume/resumeData";

const ResumeTechSection = () => {
    return (
        <section className="w-full border-b border-[#e5e5e5] bg-[#f9f9f8]">
            <div className="px-[2.4rem] py-[6rem] tablet:py-[8rem]">
                <h2 className="text-[2.4rem] tablet:text-[3.6rem] font-bold text-[#111] mb-[3.2rem] tracking-[-0.02em]">
                    기술 스택
                </h2>
                <div className="flex flex-wrap gap-[1.2rem]">
                    {resumeTechStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-[1.6rem] py-[0.8rem] text-[1.3rem] font-medium border border-[#e5e5e5] rounded-full bg-white text-[#333] hover:border-[#646cff] hover:text-[#646cff] transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResumeTechSection;
