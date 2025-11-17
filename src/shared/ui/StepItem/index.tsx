import cn from 'classnames'

import './styles.scss'
import type { Id } from '../../../types/types'

export const StepItem = ({
	active = false,
	completed = false,
	content = 1,
	handleClick,
}: {
	id: Id;
	content: number
	completed: boolean | undefined
	active: boolean
	handleClick: () => void
}) => {
	return (
		<li className={cn('StepItem', active && 'active', completed && 'completed')} onClick={handleClick}>
			{content}
		</li>
	)
}
