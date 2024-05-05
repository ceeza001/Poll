import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define variants
const bannerVariants = cva(
  "border rounded-xl text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

// Define props interface
interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

// Map variant names to icon components
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

// Banner component
const Banner: React.FC<BannerProps> = ({
  label,
  variant,
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-6 w-6 mr-2" />
      {label}
    </div>
  );
};

export default Banner;