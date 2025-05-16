"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { memo } from "react";
import styled, { type WebTarget } from "styled-components";

import styles from "./Block.module.scss";

export const variants = cva(styles.Block, {
  variants: {
    variant: {
      primary: styles.Primary,
      secondary: styles.Secondary,
    },
    size: {
      sm: styles.Sm,
      md: styles.Md,
      lg: styles.Lg,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const styledComp = (type: { comp: WebTarget; name: string }) =>
  styled(type.comp)<Props>((props) => {
    const padX = Array.isArray(props.pad)
      ? props.pad[0]
      : props.pad != undefined
        ? props.pad
        : 4;
    const padY = Array.isArray(props.pad)
      ? props.pad[1]
      : props.pad != undefined
        ? props.pad
        : 4;
    const radius = props.radius || 2;

    return {
      "--padT": `calc(var(--sp) * ${padY})`,
      "--padR": `calc(var(--sp) * ${padX})`,
      "--padB": `calc(var(--sp) * ${padY})`,
      "--padL": `calc(var(--sp) * ${padX})`,
      "--rad": `calc(var(--sp) * ${radius})`,
    };
  });

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {
  asChild?: boolean;
  radius?: number;
  pad?: number | [number, number];
}

const Block = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      variant,
      radius,
      pad,
      size,
      children,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    const Styled = styledComp({ comp: Comp, name: "Block" });

    return (
      <Styled
        className={variants({ variant, size, className })}
        ref={ref}
        $radius={radius}
        $pad={pad}
        {...props}
      >
        <div className={"BlockInner " + styles.BlockInner}>{children}</div>
      </Styled>
    );
  },
);
Block.displayName = "Block";

export default memo(Block);
