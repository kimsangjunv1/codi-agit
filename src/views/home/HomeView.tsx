import { ComponentProps } from "react";

import { HomePanel } from "@/widgets/home";

type HomeViewProps = ComponentProps<typeof HomePanel>;

export default function HomeView(props: HomeViewProps) {
    return <HomePanel {...props} />;
}
