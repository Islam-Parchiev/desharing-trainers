// DataExamples

// TrainerType - AccentTrainer
// interface IAccentTrainerLetter {
//     id: Id;
//     letter: string;
//     checked: boolean;
//     correct: boolean;
// }
// interface AccentLetterProps {
//     title: string;
//     data: IAccentTrainerLetter[]
// }
/*
нужно убрать checked чтобы на беке его не было
{
title:"Нажми на букву, чтобы поставить ударение"
data:[
  { id: 1, letter: "Г", checked: false, correct: false },
  { id: 2, letter: "О", checked: false, correct: true },
  { id: 3, letter: "Р", checked: false, correct: false },
  { id: 4, letter: "О", checked: false, correct: false },
  { id: 5, letter: "Д", checked: false, correct: false },
]
  }
*/

//////////////////////////////////////////////////////////////////////////////$Recycle.Bin




// TrainerType - ChoiceMultipleVariants

// export interface ChoiceRightVariant {
//     id: Id;
//     questionTitle: string;
//     correctVariants: Id[]; здесь я перечислил просто идентификаторы правильных ответов, но это можнт быть и массив значений правильных ответов
//     variants: Variant[]
// }

// [
    // {
    //     id:1,
    //     correctVariants:[2,4,5],
    //     questionTitle:"Что делают люди с помощью речи ? Выбери 3 ответа",
    //     variants:[
    //         {id:1,title:"рычат"},
    //         {id:2,title:"спрашивают"},
    //         {id:3,title:"молчат"},
    //         {id:4,title:"просят"},
    //         {id:5,title:"рассказывают"}
    //     ]
    // }
// ]



////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrainerType - ChoiceRightImage
// export interface ImageVariant {
//   id: Id;
//   imageUrl: string;
//   correct: boolean;
// }
// {
//   variants:[
//     {
//         id: 1,
//         imageUrl: "/а.jpg",
//         correct: false,
//     },
//     {
//         id: 2,
//         imageUrl: "/б.jpg",
//         correct: true,
//     },
//     {
//         id: 3,
//         imageUrl: "/в.jpg",
//         correct: false,
//     }
// ],
// title:"Выберите правильную картинку"
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////$Recycle.Bin
// TrainerType - ChoiceRightVariant

// {
//   title:"test",
//   variants: [
//     { id: 1,title: "рассказывают" },
//     { id: 2, title: "дерутся" },
//     { id: 3, title: "молчат" },
//     { id: 4, title: "спят" }],
//     correctVariantId:1
// }



// TrainerType - DialogTrainer

// interface DialogSentence {
//   id: Id;
//   type: "sentence";
//   value: string;
// }
// interface DialogSlot {
//   id: Id;
//   type: "slot";
//   currentValue: string | null;
//   correctValue: string;
// }
// interface DialogVariant {
//   id: Id;
//   value: string;
// }
// type DialogItem = DialogSentence | DialogSlot;
// {
//   data:[
//     { id: 1, type: "sentence", value: "Привет, Маша!" },
//     { id: 2, type: "slot", correctValue: "Привет, Серёжа!", currentValue: null },
//     { id: 3, type: "sentence", value: "Ты куда спешишь ?" },
//     { id: 4, type: "slot", correctValue: "В музыкальную школу!", currentValue: null }
// ] - DialogItem[]
// variants:[
        // {
          // id: 1,
          // value: "Привет, Серёжа!"
      // },
      // {
          // id: 2,
          // value: "В музыкальную школу!"
      // }
  // ]
// }


// TrainerType - DnDColumns

// {
//   slots:[
//     {
//         id: 1,
//         currentValue: null,
//         correctValue: "книга сказок",
//         content: "Катись, катись, яблочко наливное, по серебряному блюдечку!"
//     },
//     {
//         id: 2,
//         currentValue: null,
//         correctValue: "энциклопедия",
//         content: "Яблоко - плод яблони, один из самых доступных источников витаминов."
//     },
//     {
//         id: 3,
//         currentValue: null,
//         correctValue: "разговор",
//         content: "Хочешь куснуть яблоко ?"

//     }
// ]
// variants:[
//   {
//       id: 1,
//       value: "энциклопедия"
//   },
//   {
//       id: 2,
//       value: "разговор"
//   },
//   {
//       id: 3,
//       value: "книга сказок"
//   }
// ]
// }


// TrainerType - DragAndDrop
// export interface IWord {
//   id: Id;
//   title: string;
// }
// export interface ISlot {

//   id: Id;
//   current: string | null;
//   imageUrl: string;
//   correctValue: string;

// }
// interface IProps {
//   words: IWord[];
//   slots: ISlot[];
//   setSlots: Dispatch<SetStateAction<ISlot[]>>;
// }


/* {
words:[{ id: 1, title: "Мяуканье" }, { id: 2, title: "V8" }, { id: 3, title: "Лай" }]
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
}*/




// TrainerType - FillInTrainer
// interface IVariant { id: Id; variant: string; correct: boolean; }
/*{
variants:[
        {
            id: 1,
            variant: "башкирский",
            correct: false
        },
        {
            id: 2,
            variant: "калмыцкий",
            correct: true,
        },
        {
            id: 3,
            variant: "чувашский",
            correct: false
        },
        {
            id: 4,
            variant: "якутский",
            correct: false
        },
    ]
}*/



// TrainerType -  TableTrainer
// IN DEVELOPING