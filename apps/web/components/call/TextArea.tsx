import { cn } from '@/utils/style'
import { forwardRef } from 'react'

export const TextArea = forwardRef<
	HTMLTextAreaElement,
	JSX.IntrinsicElements['textarea']
>(({ className, ...rest }, ref) => (
	<textarea
		ref={ref}
		className={cn(
			'bg-zinc-50 dark:bg-zinc-600 text-base border-2 border-zinc-500 w-full resize-none block p-2 rounded',
			className
		)}
		{...rest}
	/>
))

TextArea.displayName = 'TextArea'
