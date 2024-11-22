import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import * as React from "react";

import styles from "./button.module.scss";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  styles.Button +
    " inline-flex items-center justify-center rounded-full text-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        text: "text-primary hover:text-accent-foreground",
        textSecondary: "text-muted-foreground hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        linkMuted: "underline-offset-4 hover:underline text-muted-foreground",
      },
      size: {
        default: "text-base h-8 px-5",
        sm: "text-sm h-7 px-4 rounded-full",
        lg: "text-lg h-9 px-9 rounded-full",
        defaultTight: "text-base h-8",
        smTight: "text-sm h-7 rounded-full",
        lgTight: "text-lg h-9 rounded-full",
        xlTight: "text-xl h-10 rounded-full",
        defaultIcon: "h-8 w-8",
        smIcon: "h-7 w-7",
        lgIcon: "h-9 w-9",
        xlIcon: "h-10 w-10",
      },
      flavour: {
        default: "",
        iconOnly: styles.IconOnly,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      flavour: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      flavour,
      asChild = false,
      startDecorator,
      endDecorator,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ size, variant, flavour, className }))}
        ref={ref}
        {...props}
      >
        {startDecorator}
        {children && <span className="flex-inline">{children}</span>}
        {endDecorator}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
