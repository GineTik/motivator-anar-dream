import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";

import { isExternalHref } from "@/shared/lib/utils";

type SmartLinkProps = ComponentProps<"a"> & {
	href: string;
	openInNewTab?: boolean;
};

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
	({ href, openInNewTab, children, ...rest }, ref) => {
		const isExternal = isExternalHref(href);
		const targetProps =
			isExternal || openInNewTab
				? { target: "_blank" as const, rel: "noopener noreferrer" }
				: {};

		if (isExternal) {
			return (
				<a ref={ref} href={href} {...targetProps} {...rest}>
					{children}
				</a>
			);
		}

		return (
			<Link ref={ref} href={href} {...targetProps} {...rest}>
				{children}
			</Link>
		);
	},
);

SmartLink.displayName = "SmartLink";
