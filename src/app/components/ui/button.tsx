import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";

export function Button({ className, ...args }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "hover:border-border-hover transition border w-full border-border rounded-lg py-2 px-4 disabled:opacity-50 flex gap-2 items-center justify-center",
        className
      )}
      {...args}
    />
  );
}

interface Props extends ComponentProps<"button"> {
  icon: JSX.Element;
}

export function ButtonIcon({ children, icon, className, ...args }: Props) {
  return (
    <Button className={cn("group", className)} {...args}>
      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition">
        {icon}
      </span>
      <Text className="group-hover:translate-x-0 -translate-x-2 transition">
        {children}
      </Text>
    </Button>
  );
}
