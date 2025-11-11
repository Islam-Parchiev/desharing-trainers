import type { ITask } from "../App";
import type { ChoiceRightVariant } from "../trainers/ChoiceMultipleVariants";

export const VariantTasks: ITask[] = [
    {
        id: 1,
        questionTitle: "Что делают люди с помощью речи ?2",
        variants: [
            { id: 1,title: "рассказывают" },
            { id: 2, title: "дерутся" },
            { id: 3, title: "молчат" },
            { id: 4, title: "спят" }],
            correctVariantId:1
    },
    {
        id: 2,
        questionTitle: "Что необходимо растению для роста?",
        variants: [
            { id: 1,title: "солнечный свет" },
            { id: 2, title: "шоколад" },
            { id: 3, title: "компьютер" },
            { id: 4, title: "футбольный мяч" }
        ],
          correctVariantId:1
    },
    {
        id: 3,
        questionTitle: "Какой предмет помогает читать карту?",
        variants: [
            { id: 1, title: "ложка" },
            { id: 2,title: "компас" },
            { id: 3, title: "расческа" },
            { id: 4, title: "наушники" }
        ],
          correctVariantId:2
    },
    {
        id: 4,
        questionTitle: "Что помогает врачу слушать сердце и легкие?",
        variants: [
            { id: 1, title: "термометр" },
            { id: 2, title: "весы" },
            { id: 3,title: "стетоскоп" },
            { id: 4, title: "часы" }
        ],
          correctVariantId:3
    },
    {
        id: 5,
        questionTitle: "Кто является автором «Евгения Онегина»?",
        variants: [
            { id: 1,title: "Александр Пушкин" },
            { id: 2, title: "Лев Толстой" },
            { id: 3, title: "Федор Достоевский" },
            { id: 4, title: "Антон Чехов" }
        ],
          correctVariantId:1
    },
    {
        id: 6,
        questionTitle: "Как называется наука о живой природе?",
        variants: [
            { id: 1, title: "математика" },
            { id: 2, title: "химия" },
            { id: 3,title: "биология" },
            { id: 4, title: "астрономия" }
        ],
          correctVariantId:3
    }
]
export const MultipleVariantsTasks:ChoiceRightVariant[]=[
    {
        id:1,
        correctVariants:[2,4,5],
        questionTitle:"Что делают люди с помощью речи ? Выбери 3 ответа",
        variants:[
            {id:1,title:"рычат"},
            {id:2,title:"спрашивают"},
            {id:3,title:"молчат"},
            {id:4,title:"просят"},
            {id:5,title:"рассказывают"}
        ]
    }
]

export const DNDTasks = [
    {
        id:1,
        words:[{ id: 1, title: "Мяуканье" }, { id: 2, title: "V8" }, { id: 3, title: "Лай" }],
        slots:[
        {
            id: 1,
            current: null,
            imageUrl: "dog.png",
            correctValue: "Лай"
        },
        {
            id: 2,
            current: null,
            imageUrl: "cat.png",
            correctValue: "Мяуканье"
        },
        {
            id: 3,
            current: null,
            imageUrl: "v8.png",
            correctValue: "V8"
        }
    ]
    }
]