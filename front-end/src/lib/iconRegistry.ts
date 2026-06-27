import {
  Book,
  BriefcaseBusiness,
  Building2,
  ChartBar,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Info,
  MessagesSquare,
  Newspaper,
  Shield,
  Trash2,
  TreePine,
  Users,
  Wheat,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export const iconRegistry = {
  Book,
  BriefcaseBusiness,
  Building2,
  ChartBar,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Info,
  MessagesSquare,
  Newspaper,
  Shield,
  Trash2,
  TreePine,
  Users,
  Wheat,
  Wrench,
} satisfies Record<string, LucideIcon>;

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return Info;

  return iconRegistry[iconName as keyof typeof iconRegistry] ?? Info;
}
