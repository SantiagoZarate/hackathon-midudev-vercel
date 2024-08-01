import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

const textStyles = cva("text-pretty capitalize", {
  variants: {
    intent: {
      regular: "text-secondary",
      title: "font-bold tracking-wide text-sm",
      detail: "text-xs",
    },
  },
  defaultVariants: {
    intent: "regular",
  },
});

type Props = VariantProps<typeof textStyles> & ComponentProps<"p">;

export function Text({ intent, className, ...args }: Props) {
  return <p className={textStyles({ intent, className })} {...args} />;
}
