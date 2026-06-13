import { resumeProfile, resumeTechStack } from "@/shared/constants/resume/resumeData";

type ResumeHeroSectionProps = {
    onScrollToProjects?: () => void;
};

const ResumeHeroSection = ({ onScrollToProjects }: ResumeHeroSectionProps) => {
    return (
        <section className="w-full border-b border-[#e5e5e5]">
            <div className="flex flex-col items-center justify-center text-center px-[2.4rem] py-[8rem] tablet:py-[12rem] bg-[#f9f9f8]">
                <h1 className="text-[2.8rem] tablet:text-[4.8rem] font-bold leading-[1.35] max-w-[80rem] text-[#111] tracking-[-0.02em]">
                    {resumeProfile.mission}
                </h1>
                <button
                    type="button"
                    onClick={onScrollToProjects}
                    className="mt-[3.2rem] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-medium border border-[#d4d4d4] rounded-[0.6rem] bg-white text-[#111] hover:border-[#646cff] hover:text-[#646cff] transition-colors cursor-pointer"
                >
                    프로젝트 보기
                </button>
            </div>

            <div className="flex flex-col tablet:flex-row items-start tablet:items-center gap-[2.4rem] tablet:gap-0 px-[2.4rem] py-[2.4rem] bg-[#f9f9f8] border-t border-[#e5e5e5]">
                <p className="text-[1.3rem] text-[#666] whitespace-nowrap tablet:pr-[3.2rem] tablet:border-r tablet:border-[#e5e5e5]">
                    주요 기술 스택
                </p>
                <div className="flex flex-wrap items-center gap-x-[2.4rem] gap-y-[1.2rem] tablet:pl-[3.2rem]">
                    {resumeTechStack.slice(0, 8).map((tech, i) => (
                        <span
                            key={tech}
                            className={`text-[1.4rem] font-semibold text-[#111] ${i > 0 ? "tablet:border-l tablet:border-[#e5e5e5] tablet:pl-[2.4rem]" : ""}`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResumeHeroSection;
