import { describe, expect, it } from "vitest";

import { generateMeshGradientStyle, hashString } from "@/shared/lib/thumbnail/generateMeshGradientStyle";

describe("hashString", () => {
    it("returns the same hash for the same input", () => {
        expect(hashString("hello")).toBe(hashString("hello"));
    });

    it("returns different hashes for different inputs", () => {
        expect(hashString("post-1")).not.toBe(hashString("post-2"));
    });
});

describe("generateMeshGradientStyle", () => {
    it("returns the same background for the same seed", () => {
        const first = generateMeshGradientStyle(42);
        const second = generateMeshGradientStyle(42);

        expect(first.background).toBe(second.background);
    });

    it("returns different backgrounds for different seeds", () => {
        const first = generateMeshGradientStyle(1);
        const second = generateMeshGradientStyle(2);

        expect(first.background).not.toBe(second.background);
    });

    it("includes mesh radial gradients and a base color", () => {
        const style = generateMeshGradientStyle("sample-title");

        expect(style.background).toContain("radial-gradient");
        expect(style.background).toContain("hsl(");
    });
});
