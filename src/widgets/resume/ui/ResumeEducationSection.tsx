import { resumeActivity, resumeEducation } from "@/shared/constants/resume/resumeData";

const ResumeEducationSection = () => {
    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 tablet:grid-cols-2 border-b border-[#e5e5e5]">
                <div className="p-[2.4rem] tablet:p-[4.8rem] border-b tablet:border-b-0 tablet:border-r border-[#e5e5e5]">
                    <h2 className="text-[2rem] tablet:text-[2.4rem] font-bold text-[#111] mb-[2.4rem]">학력</h2>
                    <p className="text-[1.5rem] font-semibold text-[#222]">{resumeEducation.school}</p>
                    <p className="text-[1.3rem] text-[#888] mt-[0.4rem]">{resumeEducation.period}</p>
                </div>

                <div className="p-[2.4rem] tablet:p-[4.8rem]">
                    <h2 className="text-[2rem] tablet:text-[2.4rem] font-bold text-[#111] mb-[2.4rem]">대외활동</h2>
                    <p className="text-[1.5rem] font-semibold text-[#222]">{resumeActivity.title}</p>
                    <p className="text-[1.3rem] text-[#888] mt-[0.4rem]">{resumeActivity.period}</p>
                    <p className="text-[1.4rem] text-[#555] mt-[1.2rem]">{resumeActivity.description}</p>
                </div>
            </div>

            <div className="px-[2.4rem] py-[3.2rem] text-center text-[1.2rem] text-[#999]">
                © {new Date().getFullYear()} {resumeEducation.school.split(" ")[0]} · 김상준
            </div>
        </section>
    );
};

export default ResumeEducationSection;
