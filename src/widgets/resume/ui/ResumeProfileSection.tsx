import { resumeProfile, resumeSummaryStats } from "@/shared/constants/resume/resumeData";

const ResumeProfileSection = () => {
    const profileItems = [
        { label: "이름", value: resumeProfile.name },
        { label: "경력", value: `${resumeProfile.role} · ${resumeProfile.experience} (${resumeProfile.birthYear})` },
        { label: "이메일", value: resumeProfile.email, href: `mailto:${resumeProfile.email}` },
        { label: "연락처", value: resumeProfile.phone },
        { label: "GitHub", value: "github.com/kimsangjunv1", href: resumeProfile.github },
        { label: "포트폴리오", value: "portfoliosj-react.netlify.app", href: resumeProfile.portfolio },
        { label: "서비스", value: "codi-agit.com", href: resumeProfile.service },
        { label: "병역", value: resumeProfile.military },
    ];

    return (
        <section className="w-full border-b border-[#e5e5e5]">
            <div className="px-[2.4rem] py-[6rem] tablet:py-[8rem]">
                <h2 className="text-[2.4rem] tablet:text-[3.6rem] font-bold text-[#111] mb-[4.8rem] tracking-[-0.02em]">프론트엔드 개발자, {resumeProfile.name}</h2>

                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[1.6rem] mb-[4.8rem]">
                    {resumeSummaryStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="border border-[#e5e5e5] rounded-[0.8rem] p-[2.4rem] bg-white"
                        >
                            <p className="text-[3.2rem] tablet:text-[4rem] font-bold text-[#111] leading-none">{stat.value}</p>
                            <p className="text-[1.3rem] text-[#888] mt-[0.8rem]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[4.8rem]">
                    <div>
                        <p className="text-[1.2rem] font-bold text-[#888] uppercase tracking-wider mb-[1.2rem]">지원 동기</p>
                        <p className="text-[1.5rem] leading-[1.7] text-[#333]">{resumeProfile.motivation}</p>
                    </div>
                    <div>
                        <p className="text-[1.2rem] font-bold text-[#888] uppercase tracking-wider mb-[1.2rem]">자기소개</p>
                        <p className="text-[1.5rem] leading-[1.7] text-[#333]">{resumeProfile.introduction}</p>
                    </div>
                </div>

                <dl className="grid grid-cols-1 tablet:grid-cols-2 gap-x-[4.8rem] gap-y-[1.2rem] mt-[4.8rem] pt-[4.8rem] border-t border-[#e5e5e5]">
                    {profileItems.map((item) => (
                        <div
                            key={item.label}
                            className="grid grid-cols-[10rem_1fr] gap-[0.8rem] text-[1.4rem]"
                        >
                            <dt className="font-bold text-[#666]">{item.label}</dt>
                            <dd className="text-[#222]">
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#646cff] hover:underline"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    item.value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default ResumeProfileSection;
