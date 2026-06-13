import Image from "next/image";

import { util } from "@/shared/lib/util";

export type PostHeroViewServerProps = {
    imageUrl: string;
    title: string;
    summary: string;
    createDate: string;
    viewCount: number;
    likeCount: number;
    thumbnailAlt?: string;
};

const PostHeroViewServer = ({
    imageUrl,
    title,
    summary,
    createDate,
    viewCount,
    likeCount,
    thumbnailAlt,
}: PostHeroViewServerProps) => {
    const heroImageAlt = thumbnailAlt || title;

    return (
        <article className="relative flex flex-col items-end justify-end gap-[1.6rem] w-full h-full rounded-[calc(1.6rem*3)] overflow-hidden">
            <section className="flex flex-col items-start justify-end gap-[2.4rem] h-full w-full max-w-[var(--size-tablet)] px-[1.2rem] py-[7.2rem] z-[100] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] pointer-events-none">
                <section className="flex flex-col gap-[1.2rem]">
                    <h1 className="font-bold tablet:text-[2.0rem] mobile:text-[1.4rem] text-white">{title}</h1>
                    <h2 className="font-extrabold text-left tablet:text-[3.2rem] mobile:text-[2.0rem] text-white leading-[1.5] whitespace-break-spaces">
                        &quot;{summary}&quot;
                    </h2>
                </section>

                <section className="flex items-end flex-wrap gap-[1.6rem]">
                    <div className="relative rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]">
                        <Image
                            src="/images/picture/profile.png"
                            alt="프로필"
                            width={92}
                            height={92}
                            className="object-cover rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]"
                        />
                    </div>

                    <section className="flex flex-col items-start gap-[1.2rem]">
                        <section className="flex gap-[0.8rem]">
                            <p className="font-bold text-[2.0rem] text-white">김상준</p>
                            <p className="text-[2.0rem] font-semibold text-[#ffffff90]">FRONT END DEVELOPER</p>
                        </section>

                        <p className="font-semibold text-[2.0rem] text-white ">
                            {util.string.getCurrentTime(createDate, 4)} ・ {viewCount} view ・ {likeCount} likes
                        </p>
                    </section>
                </section>
            </section>

            <div className="absolute top-0 left-[50%] transform translate-x-[-50%] w-full h-full bg-[linear-gradient(0deg,_#000,_#00000000)] z-[1] rounded-[2.4rem] pointer-events-none" />

            <div className="absolute inset-0 rounded-[2.4rem] overflow-hidden z-0">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={heroImageAlt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center pointer-events-none"
                    />
                ) : (
                    <div className="w-full h-full bg-[var(--color-gray-200)] pointer-events-none" aria-hidden />
                )}
            </div>
        </article>
    );
};

export default PostHeroViewServer;
