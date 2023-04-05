import { clsx } from "@mantine/core";
import { ComponentProps } from "react";

interface TabProps extends Omit<ComponentProps<"div">, "onChange"> {
    isActive: boolean;
}

export const Tab = ({ className, isActive, ...rest }: TabProps) => {
    return <div className={clsx("tab tab-bordered", isActive && "tab-active", className)} {...rest} />;
};

export const TabGroup = ({ className, ...rest }: ComponentProps<"div">) => {
    return <div className={clsx("tabs", className)} {...rest} />;
};
