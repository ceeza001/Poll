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

// Banner component
const Banner: React.FC<BannerProps> = ({
  label,
  variant,
}: BannerProps) => {
  
  return (
    <div className={cn(bannerVariants({ variant }))}>
      {label}
    </div>
  );
};

export default Banner;