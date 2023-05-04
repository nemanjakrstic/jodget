import clsx from "clsx";
import { ComponentProps } from "react";

interface TabProps extends Omit<ComponentProps<"button">, "onChange"> {
    isActive: boolean;
}

export const Tab = ({ className, title, isActive, ...rest }: TabProps) => {
    return (
        <button className={clsx("tab tab-bordered", isActive && "tab-active", className)} {...rest}>
            {title}
        </button>
    );
};

export const TabGroup = ({ className, ...rest }: ComponentProps<"div">) => {
    return <div className={clsx("tabs inline-block tabs-boxed", className)} {...rest} />;
};
