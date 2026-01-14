import type { Id } from '../../types/types'

export interface IChooseCorrectVariant {
	type: 'ChooseCorrectVariant'
	title: string
	correctVariant: string
	variants: string[]
}
export interface IChooseMultipleVariants {
	type: 'ChooseMultipleVariants'
	correctVariants: string[]
	title: string
	variants: { id: Id; title: string }[]
}
export type CardDataType = IChooseCorrectVariant | IChooseMultipleVariants
