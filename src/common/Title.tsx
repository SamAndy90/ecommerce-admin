import { twMerge } from "tailwind-merge";

export type TitleProps = {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
};

export function Title(props: TitleProps) {
  const { children, component = "h2", className } = props;
  const Component = component;

  return (
    <Component
      className={twMerge(
        "text-2xl font-medium !leading-tight md:text-3xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
