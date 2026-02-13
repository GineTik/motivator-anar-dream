import { type VariantProps, cva } from "class-variance-authority";
import {
	type ButtonHTMLAttributes,
	type AnchorHTMLAttributes,
	type ReactNode,
	forwardRef,
} from "react";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center no-underline font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 tracking-[-0.01em] cursor-pointer whitespace-nowrap",
	{
		variants: {
			variant: {
				gradient: [
					"text-white rounded-full",
					"bg-[length:100%_200%] bg-[position:0_0] hover:bg-[position:0_100%]",
					"bg-[linear-gradient(to_bottom,var(--color-brand-gradient-from),var(--color-brand-gradient-to)_50%,var(--color-brand-primary)_50%)]",
					"shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.87)]",
					"transition-[background-position] duration-300 ease-in-out",
				].join(" "),
				solid:
					"bg-brand-primary text-white rounded-xl font-semibold transition-colors duration-300 hover:bg-brand-purple",
				secondary:
					"bg-brand-accent text-white rounded-full border-0 transition-colors duration-300 hover:bg-brand-primary",
			},
			size: {
				sm: "px-[22px] py-2.5 text-[15px]",
				default:
					"px-6 py-3 sm:px-7 sm:py-3.5 md:px-[35px] md:py-4 max-[479px]:px-[22px] max-[479px]:py-2.5",
				lg: "px-5 sm:px-7 md:px-[34px] h-[52px] md:h-[57px]",
			},
		},
		defaultVariants: {
			variant: "gradient",
			size: "default",
		},
	},
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariantProps & {
		href?: never;
	};

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> &
	ButtonVariantProps & {
		href: string;
	};

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & {
	children: ReactNode;
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	({ className, variant, size, children, ...props }, ref) => {
		const classes = cn(buttonVariants({ variant, size }), className);

		if ("href" in props && props.href) {
			return (
				<a
					ref={ref as React.Ref<HTMLAnchorElement>}
					className={classes}
					{...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{children}
				</a>
			);
		}

		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				className={classes}
				{...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
