'use client'
import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import './styles.scss'

export const MoveBoxImage = ({ id, char = 'a', isDisabled }: { id: number | string; char: string; isDisabled: boolean }) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
		data: { char },
		disabled: isDisabled,
	})

	const style = transform
		? {
			transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		}
		: undefined
	return (
		<li className="MoveBoxImage__wrapper">
			<span
				className={cn('MoveBoxImage', isDisabled && 'disabled', isDragging && 'dragging')}
				style={style}
				{...listeners}
				{...attributes}
				ref={setNodeRef}>
				{char}
			</span>
			{isDragging && <span className="MoveBoxImage disabled">{char}</span>}
		</li>
	)
}
