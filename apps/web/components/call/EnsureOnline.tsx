import { useIsOnline } from '@/hooks/useIsOnline'
import type { ReactNode } from 'react'

export interface EnsureOnlineProps {
	children?: ReactNode
	fallback?: ReactNode
}

export function EnsureOnline(props: EnsureOnlineProps) {
	const isOnline = useIsOnline()

	if (!isOnline) {
		return props.fallback
	}

	return props.children
}
