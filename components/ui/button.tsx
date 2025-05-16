import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import * as React from "react";

import scssStyles from "./button.module.scss";
import styles from "./button.module.css";

import { cn } from "@/lib/utils";

const buttonVariants = cva(`${scssStyles.Button} ${styles.button}`, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      text: styles.text,
      textSecondary: styles.textSecondary,
      link: styles.link,
      linkMuted: styles.linkMuted,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      defaultTight: styles.sizeDefaultTight,
      smTight: styles.sizeSmTight,
      lgTight: styles.sizeLgTight,
      xlTight: styles.sizeXlTight,
      defaultIcon: styles.sizeDefaultIcon,
      smIcon: styles.sizeSmIcon,
      lgIcon: styles.sizeLgIcon,
      xlIcon: styles.sizeXlIcon,
    },
    flavour: {
      default: "",
      iconOnly: scssStyles.IconOnly,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    flavour: "default",
  },
});

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
        {children && <span>{children}</span>}
        {endDecorator}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
