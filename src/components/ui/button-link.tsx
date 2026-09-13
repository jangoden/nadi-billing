import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "teal" | "white" | "ghost";
  icon?: IconName | false;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", icon = "arrow", className = "" }: ButtonLinkProps) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}{icon && <Icon name={icon} size={16} />}</Link>;
}

