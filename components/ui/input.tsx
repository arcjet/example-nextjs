import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./input.module.css";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(styles.input, className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
