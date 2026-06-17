import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from "@/shared/lib/seo/constants";
import { getSiteUrl } from "@/shared/lib/siteUrl";

import GlobalErrorBoundary from "@/app/providers/GlobalErrorBoundary";
import QueryProvider from "@/app/providers/QueryProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import PopupProvider from "@/app/providers/PopupProvider";
import LenisProvider from "@/app/providers/LenisProvider";

// import Toast from "@/shared/ui/layout/Toast";
import PathCheckComponent from "@/shared/ui/common/PathCheckComponent";
import PageRevealOverlay from "@/shared/ui/common/PageRevealOverlay";
import PageContentGate from "@/shared/ui/common/PageContentGate";
import RootChromeView from "@/views/layout/RootChromeView";

import "lenis/dist/lenis.css";

import "@/shared/styles/scss/global.css";
import "@/shared/styles/scss/index.scss";
import { Toast } from "@/shared/ui/layout/Toast";

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

const MATERIAL_SYMBOLS_FONT_URL = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block";

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href={MATERIAL_SYMBOLS_FONT_URL}
                />
            </head>
            <body>
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                            <PopupProvider>
                                <LenisProvider />
                                <PageRevealOverlay />
                                <PageContentGate>
                                    <RootChromeView>
                                        <PathCheckComponent>
                                            {children}
                                            {modal}
                                        </PathCheckComponent>
                                    </RootChromeView>
                                </PageContentGate>
                            </PopupProvider>
                            <Toast />
                        </AuthProvider>
                    </QueryProvider>
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
