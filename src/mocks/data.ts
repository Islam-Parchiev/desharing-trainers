import type { ITask } from '../App'
import type { TheoryDataItem } from '../theory/Child'
import type { ChoiceRightVariant } from '../trainers/moduleOne/ChoiceMultipleVariants'
import type { Tool } from '../trainers/moduleThree/colorWords'
import type { TrainerTypes, WordClicker } from '../types/types'

export const VariantTasks: ITask[] = [
	{
		id: 1,
		questionTitle: 'Что делают люди с помощью речи ?2',
		variants: [
			{ id: 1, title: 'рассказывают' },
			{ id: 2, title: 'дерутся' },
			{ id: 3, title: 'молчат' },
			{ id: 4, title: 'спят' },
		],
		correctVariantId: 1,
	},
	{
		id: 2,
		questionTitle: 'Что необходимо растению для роста?',
		variants: [
			{ id: 1, title: 'солнечный свет' },
			{ id: 2, title: 'шоколад' },
			{ id: 3, title: 'компьютер' },
			{ id: 4, title: 'футбольный мяч' },
		],
		correctVariantId: 1,
	},
	{
		id: 3,
		questionTitle: 'Какой предмет помогает читать карту?',
		variants: [
			{ id: 1, title: 'ложка' },
			{ id: 2, title: 'компас' },
			{ id: 3, title: 'расческа' },
			{ id: 4, title: 'наушники' },
		],
		correctVariantId: 2,
	},
	{
		id: 4,
		questionTitle: 'Что помогает врачу слушать сердце и легкие?',
		variants: [
			{ id: 1, title: 'термометр' },
			{ id: 2, title: 'весы' },
			{ id: 3, title: 'стетоскоп' },
			{ id: 4, title: 'часы' },
		],
		correctVariantId: 3,
	},
	{
		id: 5,
		questionTitle: 'Кто является автором «Евгения Онегина»?',
		variants: [
			{ id: 1, title: 'Александр Пушкин' },
			{ id: 2, title: 'Лев Толстой' },
			{ id: 3, title: 'Федор Достоевский' },
			{ id: 4, title: 'Антон Чехов' },
		],
		correctVariantId: 1,
	},
	{
		id: 6,
		questionTitle: 'Как называется наука о живой природе?',
		variants: [
			{ id: 1, title: 'математика' },
			{ id: 2, title: 'химия' },
			{ id: 3, title: 'биология' },
			{ id: 4, title: 'астрономия' },
		],
		correctVariantId: 3,
	},
]
export const MultipleVariantsTasks: Omit<ChoiceRightVariant, 'handleNext'>[] = [
	{
		id: 1,
		correctVariants: ['спрашивают', 'просят', 'рассказывают'],
		questionTitle: 'Что делают люди с помощью речи ? Выбери 3 ответа',
		variants: [
			{ id: 1, title: 'рычат' },
			{ id: 2, title: 'спрашивают' },
			{ id: 3, title: 'молчат' },
			{ id: 4, title: 'просят' },
			{ id: 5, title: 'рассказывают' },
		],
	},
]

export const DNDTasks = [
	{
		id: 1,
		words: [
			{ id: 1, title: 'Мяуканье' },
			{ id: 2, title: 'V8' },
			{ id: 3, title: 'Лай' },
		],
		slots: [
			{
				id: 1,
				current: null,
				imageUrl: 'dog.png',
				correctValue: 'Лай',
			},
			{
				id: 2,
				current: null,
				imageUrl: 'cat.png',
				correctValue: 'Мяуканье',
			},
			{
				id: 3,
				current: null,
				imageUrl: 'v8.png',
				correctValue: 'V8',
			},
		],
	},
]

export const trainersMocks = [
	{
		id: 1,
		type: 'variant-task',
		data: {
			id: 1,
			questionTitle: 'Что делают люди с помощью речи ?2',
			variants: [
				{ id: 1, title: 'рассказывают' },
				{ id: 2, title: 'дерутся' },
				{ id: 3, title: 'молчат' },
				{ id: 4, title: 'спят' },
			],
			correctVariantId: 1,
		},
	},
	{
		id: 2,
		type: 'mult-variants',
		data: {
			id: 1,
			correctVariants: [2, 4, 5],
			questionTitle: 'Что делают люди с помощью речи ? Выбери 3 ответа',
			variants: [
				{ id: 1, title: 'рычат' },
				{ id: 2, title: 'спрашивают' },
				{ id: 3, title: 'молчат' },
				{ id: 4, title: 'просят' },
				{ id: 5, title: 'рассказывают' },
			],
		},
	},
	{
		id: 3,
		type: 'dnd-words',
		data: {
			id: 1,
			words: [
				{ id: 1, title: 'Мяуканье' },
				{ id: 2, title: 'V8' },
				{ id: 3, title: 'Лай' },
			],
			slots: [
				{
					id: 1,
					current: null,
					imageUrl: 'dog.png',
					correctValue: 'Лай',
				},
				{
					id: 2,
					current: null,
					imageUrl: 'cat.png',
					correctValue: 'Мяуканье',
				},
				{
					id: 3,
					current: null,
					imageUrl: 'v8.png',
					correctValue: 'V8',
				},
			],
		},
	},
]

export const mockTheoryData: TheoryDataItem[] = [
	{
		id: 1,
		title: 'Книжная речь',
		paragraphs: [
			'Э1ту речь мы встречаем в телепередачах, книгах и журналах. Книжная речь отличается правильностью, логичностью и точностью формулировок. Основная особенность книжной речи — соблюдение литературных норм. Она используется в официальных документах, научных работах и публицистике.,Книжная речь часто содержит сложные синтаксические конструкции и специальную терминологию, что делает её более формальной и строгой.',
		],
	},
	{
		id: 2,
		title: 'Разговорная речь',
		paragraphs: [
			'Разговорная речь используется в повседневном общении между людьми. Она характеризуется неформальностью и простотой.',
			'В отличие от книжной речи, разговорная допускает использование сокращений, разговорных выражений и эмоциональных окрасов.',
			'Разговорная речь часто ситуативна и зависит от контекста общения, жестов и мимики собеседников.',
		],
	},
	{
		id: 3,
		title: 'Научный стиль',
		paragraphs: [
			'Научный стиль речи применяется в научных трудах, исследованиях и академических публикациях.',
			'Для научного стиля характерны точность, объективность, логичность и использование терминологии.',
			'В научных текстах часто встречаются сложные предложения, цитаты и ссылки на источники.',
		],
	},
	{
		id: 4,
		title: 'Публицистический стиль',
		paragraphs: [
			'Публицистический стиль используется в СМИ, статьях и выступлениях. Его цель — информировать и воздействовать на аудиторию.',
			'Для этого стиля характерны эмоциональность, оценочность, использование риторических вопросов и повторов.',
			'Публицистический стиль сочетает элементы как книжной, так и разговорной речи для лучшего воздействия на читателя.',
		],
	},
	{
		id: 5,
		title: 'Официально-деловой стиль',
		paragraphs: [
			'Официально-деловой стиль применяется в документах, законах и деловой переписке.',
			'Характерные черты: стандартизированность, точность, отсутствие эмоциональности и использование клише.',
			'В этом стиле важна однозначность толкования, поэтому предложения часто бывают сложными и развернутыми.',
		],
	},
	{
		id: 6,
		title: 'Художественный стиль',
		paragraphs: [
			'Художественный стиль используется в литературных произведениях. Его главная функция — эстетическое воздействие.',
			'Для художественного стиля характерны образность, эмоциональность, использование разнообразных изобразительных средств.',
			'Авторы художественных текстов часто нарушают языковые нормы для создания выразительности и индивидуального стиля.',
		],
	},
	{
		id: 7,
		title: 'Просторечие',
		paragraphs: [
			'Просторечие — это речь необразованных слоев населения, находящаяся за пределами литературной нормы.',
			'Для просторечия характерны нарушения норм произношения, грамматики и использование грубых выражений.',
			'Просторечие часто используется в художественной литературе для создания речевой характеристики персонажей.',
		],
	},
]
export const mockLearningPractice: TrainerTypes[] = [
	{
		type: 'ChoiceMultipleVariants',
		data: {
			id: 1,
			correctVariants: ['спрашивают', 'просят', 'рассказывают'],
			questionTitle: 'Что делают люди с помощью речи ? Выбери 3 ответа',
			variants: [
				{ id: 1, title: 'рычат' },
				{ id: 2, title: 'спрашивают' },
				{ id: 3, title: 'молчат' },
				{ id: 4, title: 'просят' },
				{ id: 5, title: 'рассказывают' },
			],
		},
	},
	{
		type: 'ChoiceRightVariant',
		data: {
			id: 1,
			title: 'test',
			variants: [
				{ id: 1, title: 'рассказывают' },
				{ id: 2, title: 'дерутся' },
				{ id: 3, title: 'молчат' },
				{ id: 4, title: 'спят' },
			],
			correctVariantId: 1,
		},
	},
]

export const AccentLetterMocks = [
	{ id: 1, letter: 'Г', checked: false, correct: false },
	{ id: 2, letter: 'О', checked: false, correct: true },
	{ id: 3, letter: 'Р', checked: false, correct: false },
	{ id: 4, letter: 'О', checked: false, correct: false },
	{ id: 5, letter: 'Д', checked: false, correct: false },
]

export const mockConclusionData = {
	content: [
		{ id: 1, value: 'Слова в предложении {{связаны}} между собой {{по смыслу}} .', completed: false },
		{ id: 2, value: 'Слова в предложении связаны между {{собой}} по смыслу .', completed: false },
	],
	variants: [
		{
			id: 1,
			value: 'изменять',
		},
		{
			id: 2,
			value: 'заглавная',
		},
		{
			id: 3,
			value: 'по смыслу',
		},
		{
			id: 4,
			value: 'точка',
		},
		{
			id: 5,
			value: 'связаны',
		},
		{
			id: 6,
			value: 'собой',
		},
	],
	slots: [
		{ id: 11, contentId: 1, current: null, correct: 'по смыслу' },
		{ id: 22, contentId: 1, current: null, correct: 'связаны' },
		{ id: 33, contentId: 2, current: null, correct: 'собой' },
	],
}

export const mockDataColorWords = [
	{ id: 1, content: 'Кошка', correctColor: '#0000ff' },
	{ id: 2, content: 'Стол', correctColor: '#ff0000' },
	{ id: 3, content: 'Собака', correctColor: '#0000ff' },
	{ id: 4, content: 'Солнце', correctColor: '#ff0000' },
	{ id: 5, content: 'Учитель', correctColor: '#0000ff' },
	{ id: 6, content: 'Книга', correctColor: '#ff0000' },
	{ id: 7, content: 'Птица', correctColor: '#0000ff' },
	{ id: 8, content: 'Дождь', correctColor: '#ff0000' },
	{ id: 9, content: 'Ребёнок', correctColor: '#0000ff' },
]
export const mockDataColorTools: Tool[] = [
	{
		type: 'paint',
		toolColor: '#0000ff',
		toolName: 'Люди и животные',
	},
	{
		type: 'paint',
		toolColor: '#ff0000',
		toolName: 'Неживые предметы и явления',
	},
	{
		type: 'erase',
		toolName: 'Стереть',
	},
]

export const FixMistakesInTextMockData = {
	text: '{{1}} утреннее {{2}} {{3}} в тёмной морской воде.',
	correctText: 'Мягкое утреннее солнце отражается в тёмной морской воде.',
	words: [
		{ id: 1, wordN: 1, variants: ['Мягкое', 'мягкое'], correct: 'Мягкое' },
		{ id: 2, wordN: 2, variants: ['Солнце', 'солнце.', 'солнце'], correct: 'солнце' },
		{ id: 3, wordN: 3, variants: ['Отражается', 'отражается'], correct: 'отражается' },
	],
}

export const mockDataPoliteWords: WordClicker = {
	text: "Муха Жу, хоть не хотела, В скорый поезд залетела. Ей букашки Фло и Фти Скажут: 'Доброго пути!' Здравствуйте ",
	correctValues: ["'Доброго пути!'", 'Здравствуйте'],
	title: 'Нажми на вежливые слова',
}
export const mockDataWordClick: WordClicker = {
	text: 'Учёба и труд рядом идут.',
	title: 'Нажми на слова в которых ВСЕ согласные ТВЕРДЫЕ',
	correctValues: ['труд', 'идут.'],
}
