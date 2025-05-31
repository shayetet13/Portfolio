import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "gradient" | "neon" | "glass" | "rainbow";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default:
      "rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md",
    gradient:
      "rounded-xl border-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20",
    neon: "rounded-xl border border-cyan-500/50 bg-slate-900/90 text-card-foreground shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:border-cyan-400",
    glass:
      "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-card-foreground shadow-xl hover:bg-white/10 transition-all duration-300",
    rainbow:
      "rounded-xl border-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 via-blue-500/20 via-green-500/20 to-yellow-500/20 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-gradient-x",
  };

  return (
    <div ref={ref} className={cn(variants[variant], className)} {...props} />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
