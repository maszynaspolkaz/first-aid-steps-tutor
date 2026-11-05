import {
  Activity,
  AlertTriangle,
  Baby,
  Bone,
  BookOpen,
  Check,
  CheckCircle,
  ChevronLeft,
  Droplet,
  Flame,
  HeartPulse,
  Info,
  ListChecks,
  Package,
  Play,
  RotateCcw,
  ShieldAlert,
  Target,
  Thermometer,
  Timer,
  Wind,
  X,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

/** One icon library for the whole project (rule #21, NORDIC_MINIMAL -> lucide). */
export const ICON_STROKE = 1.5;

/** Every icon in this project comes from the one lucide library (rule #21). */
export type AppIcon = LucideIcon;

export const topicIcons = {
  activity: Activity,
  baby: Baby,
  bone: Bone,
  droplet: Droplet,
  flame: Flame,
  heartPulse: HeartPulse,
  info: Info,
  thermometer: Thermometer,
  wind: Wind,
};

export type TopicIconName = keyof typeof topicIcons;

export function iconFor(name: string): AppIcon {
  if (Object.prototype.hasOwnProperty.call(topicIcons, name)) {
    return topicIcons[name as TopicIconName] as AppIcon;
  }
  return Info as AppIcon;
}

export {
  Activity,
  AlertTriangle,
  Baby,
  Bone,
  BookOpen,
  Check,
  CheckCircle,
  ChevronLeft,
  Droplet,
  Flame,
  HeartPulse,
  Info,
  ListChecks,
  Package,
  Play,
  RotateCcw,
  ShieldAlert,
  Target,
  Thermometer,
  Timer,
  Wind,
  X,
};
