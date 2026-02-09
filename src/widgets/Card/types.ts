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
export interface IConclusion {
	type: 'Conclusion'
	content: { id: Id; value: string; completed: boolean }[]
	variants: {
		id: Id
		value: string
	}[]

	slots: { id: Id; contentId: Id; current: null | string; correct: string }[]
}

export type AlphabetCardType = IConclusion | IChooseCorrectVariant
export type CardDataType = IChooseCorrectVariant | IChooseMultipleVariants
