import type { IconName } from "@/components/ui/icon";

export type NavigationLink = { label: string; href: string; icon?: IconName; description?: string };
export type FeatureItem = { title: string; description: string; icon: IconName };
export type Pillar = {
  id: string; verb: string; name: string; description: string; icon: IconName;
  tone: "teal" | "blue" | "navy" | "purple"; features: string[];
};
