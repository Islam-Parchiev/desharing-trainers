'use client'
import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import './styles.scss'

export const DropInput = ({
	id,
	current,
	error
}: {
	id: number | string;
	current: string | null;
	error?: boolean;
}) => {
	const { setNodeRef } = useDroppable({ id })

	return (
		<span className={cn("DropInput__wrapper", error && "error")}>
			<span ref={setNodeRef} className={cn('DropInput', current !== null && 'DropInput--filled')}>
				{current || ''}
			</span>
		</span>
	)
}
