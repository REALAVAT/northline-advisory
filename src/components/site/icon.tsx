import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  Briefcase,
  Building2,
  ChartNoAxesCombined,
  Clock,
  Cloud,
  HeartPulse,
  House,
  Landmark,
  Lock,
  Receipt,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/data/types";

const icons = {
  landmark: Landmark,
  receipt: Receipt,
  book: BookOpenCheck,
  building: Building2,
  shield: ShieldCheck,
  chart: ChartNoAxesCombined,
  cloud: Cloud,
  cart: ShoppingCart,
  briefcase: Briefcase,
  health: HeartPulse,
  house: House,
  rocket: Rocket,
  users: Users,
  clock: Clock,
  lock: Lock,
  badge: BadgeCheck,
  scale: Scale,
  wallet: Wallet,
  award: Award,
  trending: TrendingUp,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}
