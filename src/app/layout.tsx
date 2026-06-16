import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from "@/shared/lib/seo/constants";
import { getSiteUrl } from "@/shared/lib/siteUrl";

import GlobalErrorBoundary from "@/app/providers/GlobalErrorBoundary";
import QueryProvider from "@/app/providers/QueryProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import PopupProvider from "@/app/providers/PopupProvider";
import LenisProvider from "@/app/providers/LenisProvider";

import Toast from "@/shared/ui/layout/Toast";
import PageProgress from "@/shared/ui/common/PageProgress";
import PathCheckComponent from "@/shared/ui/common/PathCheckComponent";
import ClientPageProgress from "@/shared/ui/common/ClientComponent";
import TransitionOverlay from "@/shared/ui/common/TransitionOverlay";
import RootChromeView from "@/views/layout/RootChromeView";

import "@/shared/styles/scss/global.css";
import "@/shared/styles/scss/index.scss";

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    openGraph: {
        type: "website",
        locale: "ko_KR",
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                                <PopupProvider>
                                    <PageProgress />
                                    <LenisProvider />
                                    <RootChromeView>
                                        <PathCheckComponent>
                                            <TransitionOverlay>
                                                {children}
                                                {modal}
                                            </TransitionOverlay>
                                        </PathCheckComponent>
                                    </RootChromeView>
                                    <ClientPageProgress />
                                </PopupProvider>
                                <Toast />
                        </AuthProvider>
                    </QueryProvider>
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
