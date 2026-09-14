import type { IconName } from "@/components/ui/icon";

export type NavigationLink = { label: string; href: string; icon?: IconName; description?: string };
export type FeatureItem = { title: string; description: string; icon: IconName };
export type Pillar = {
  id: string; verb: string; name: string; description: string; icon: IconName;
  tone: "teal" | "blue" | "navy" | "purple"; features: string[];
};

export type AppModuleItem = {
  name: string;
  description: string;
  badge?: string;
};

export type AppModuleCategory = {
  id: string;
  category: string;
  group: "Jaringan & FTTH" | "Billing & Finansial" | "Pelanggan & CS" | "Operasional & Keamanan";
  badge: string;
  description: string;
  icon: IconName;
  items: AppModuleItem[];
};
