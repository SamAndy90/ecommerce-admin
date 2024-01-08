import { CgSpinnerTwo } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

export type LoaderProps = {
  className?: {
    wrapper?: string;
    icon?: string;
  };
};

export function Loader(props: LoaderProps) {
  const { className = {} } = props;
  const { wrapper: wrapperClassName = "", icon: iconClassName = "" } =
    className;

  return (
    <div
      className={twMerge("flex items-center justify-center", wrapperClassName)}
    >
      <CgSpinnerTwo
        className={twMerge(
          "h-12 w-12 animate-spin text-blue-900",
          iconClassName
        )}
      />
    </div>
  );
}
