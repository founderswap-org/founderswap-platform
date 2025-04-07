import { cn } from '@/utils/style'
import type { ComponentProps } from 'react'

export function OptionalLink({
	children,
	className,
	href,
	...rest
}: ComponentProps<'a'>) {
	if (href === undefined) {
		return <span className={className}>{children}</span>
	}

	return (
		<a
			href={href}
			className={cn('no-underline hover:underline', className)}
			{...rest}
		>
			{children}
		</a>
	)
}
