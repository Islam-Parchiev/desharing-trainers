import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Language = lazy(() => import("../pages/Language").then(module => ({ default: module.Language })));
const Test = lazy(() => import("../pages/Test").then(module => ({ default: module.Test })));
const One = lazy(() => import("../pages/one").then(module => ({ default: module.One })));
const Two = lazy(() => import("../pages/two").then(module => ({ default: module.Two })));
const Three = lazy(() => import("../pages/three").then(module => ({ default: module.Three })));
const Four = lazy(() => import("../pages/four").then(module => ({ default: module.Four })));
const Five = lazy(() => import("../pages/five").then(module => ({ default: module.Five })));
const Six = lazy(() => import("../pages/six").then(module => ({ default: module.Six })));
const Seven = lazy(() => import("../pages/seven").then(module => ({ default: module.Seven })));
const Eight = lazy(() => import("../pages/eight").then(module => ({ default: module.Eight })));
const Main = lazy(() => import("../pages/Main").then(module => ({ default: module.Main })));
const TheoryChildPage = lazy(() => import("../pages/theoryChild").then(module => ({ default: module.TheoryChildPage })));
const Nine = lazy(() => import("../pages/nine").then(module => ({ default: module.Nine })));
const Dialog = lazy(() => import("../pages/dialog").then(module => ({ default: module.Dialog })));
const Example = lazy(() => import("../pages/Example").then(module => ({ default: module.Example })));
const Eleven = lazy(() => import("../pages/eleven").then(module => ({ default: module.Eleven })));
const Twelve = lazy(() => import("../pages/twelve").then(module => ({ default: module.Twelve })));
const Therteen = lazy(() => import("../pages/therteen").then(module => ({ default: module.Therteen })));
const Page = lazy(() => import("../pages/page").then(module => ({ default: module.Page })));
const IsCorrect = lazy(() => import("../trainers/moduleTwo/IsCorrect").then(module => ({ default: module.IsCorrect })));
const WhatIs = lazy(() => import("../trainers/moduleTwo/WhatIs").then(module => ({ default: module.WhatIs })));
const Conclusion = lazy(() => import("../trainers/moduleTwo/Сonclusion").then(module => ({ default: module.Conclusion })));
const StoryPuzzleSolver = lazy(() => import("../trainers/moduleTwo/StoryPuzzleSolver").then(module => ({ default: module.StoryPuzzleSolver })));
const DecryptMessage = lazy(() => import("../trainers/moduleTwo/DecryptMessage").then(module => ({ default: module.DecryptMessage })));
const DecryptMsgDND = lazy(() => import("../trainers/moduleTwo/DecryptMsgDND").then(module => ({ default: module.DecryptMsgDND })));
const CryptMessage = lazy(() => import("../trainers/moduleTwo/CryptMessage").then(module => ({ default: module.CryptMessage })));
const MatchingGame = lazy(() => import("../trainers/moduleTwo/MatchingGame").then(module => ({ default: module.MatchingGame })));
const NewWords = lazy(() => import("../trainers/moduleTwo/NewWords").then(module => ({ default: module.NewWords })));
const CollectPhrases = lazy(() => import("../trainers/moduleThree/CollectPhrases").then(module => ({ default: module.CollectPhrases })))
const UnitCounter = lazy(() => import("../trainers/UnitCounter").then(module => ({ default: module.UnitCounter })))
const LetterRecognitionTrainer = lazy(() => import("../trainers/LetterRecognitionTrainer").then(module => ({ default: module.UniversalBinaryTrainer })))
const LineDragApp = lazy(() => import("../components/lacotest").then(module => ({ default: module.LineDragApp })))
const Reorder = lazy(() => import("../components/reorder").then(module => ({ default: module.Reorder })))
const StoryReorder = lazy(() => import("../trainers/moduleTwo/StoryReorder").then(module => ({ default: module.StoryReorder })));
const WrappedFlow = lazy(() => import("../components/fl").then(module => ({ default: module.WrappedFlow })));
const VocabularyTrainer = lazy(() => import("../trainers/moduleTwo/VocabularyTrainer").then(module => ({ default: module.VocabularyTrainer })));
const FixTicket = lazy(() => import("../trainers/moduleTwo/FixTicket").then(module => ({ default: module.FixTicket })));
const ParagraphIndentTrainer = lazy(() => import("../trainers/moduleTwo/ParagraphIndentTrainer").then(module => ({ default: module.ParagraphIndentTrainer })));
const SignToWordMatcher = lazy(() => import("../trainers/moduleTwo/SignToWordMatcher").then(module => ({ default: module.SignToWordMatcher })));
const TextArchitect = lazy(() => import("../trainers/moduleTwo/TextArchitect").then(module => ({ default: module.TextArchitect })));
const ChoiceCorrectItems = lazy(() => import("../trainers/moduleTwo/ChoiceCorrectItems").then(module => ({ default: module.ChoiceCorrectItems })));
const PoliteWordsClicker = lazy(() => import("../trainers/moduleTwo/PoliteWordsClicker").then(module => ({ default: module.PoliteWordsClicker })));
const WordCategorizer = lazy(() => import("../trainers/moduleThree/wordCategorizer").then(module => ({ default: module.WordCategorizer })));
const ColorWords = lazy(() => import("../trainers/moduleThree/colorWords").then(module => ({ default: module.ColorWords })));
import LaceApp from "../components/xarrows";
import { FixMistakesWrapper } from "../components/FixMistakesWrapper";
import PuzzleGame from "../trainers/PuzzleT";
const SentenceBuilder = lazy(() => import("../trainers/moduleThree/SentenceBuilder").then(m => ({ default: m.SentenceBuilder })));
const SyllableBuilder = lazy(() => import("../trainers/moduleThree/SyllableBuilder").then(m => ({ default: m.SyllableBuilder })));
const NextSyllableChooser = lazy(() => import("../trainers/moduleThree/NextSyllableChooser").then(m => ({ default: m.NextSyllableChooser })));
const BubbleTrainer = lazy(() => import("../trainers/moduleThree/bubbleTrainer").then(m => ({ default: m.BubbleTrainer })));
const LetterSoundCategorizer = lazy(() => import("../trainers/moduleThree/LetterSoundCategorizer").then(m => ({ default: m.LetterSoundCategorizer })));
const ReorderLetters = lazy(() => import("../trainers/moduleThree/ReorderLetters").then(m => ({ default: m.ReorderLetters })));
const AlphabeticalSorter = lazy(() => import("../trainers/moduleThree/AlphabeticalSorter").then(m => ({ default: m.AlphabeticalSorter })));
const ConnectLetters = lazy(() => import("../trainers/moduleThree/ConnectLetters").then(m => ({ default: m.ConnectLetters })));
const SolveRiddle = lazy(() => import("../trainers/moduleThree/SolveRiddle").then(m => ({ default: m.SolveRiddle })));
const WhatIsSpeech = lazy(() => import("../pages/Cards/WhatIsSpeech").then(m => ({ default: m.WhatIsSpeech })));
const AlphabetCard = lazy(() => import("../pages/Cards/Alphabet").then(m => ({ default: m.AlphabetCard })));
const DeleteExtraLetter = lazy(() => import("../trainers/moduleThree/DeleteExtraLetter").then(m => ({ default: m.DeleteExtraLetter })));
const FindMistake = lazy(() => import("../trainers/moduleThree/FindMistake").then(m => ({ default: m.FindMistake })));
const WordClickerWithWrapper = lazy(() => import("../trainers/moduleThree/WordClick/wrapper").then(m => ({ default: m.WordClickerWithWrapper })));
const DistributeWords = lazy(() => import("../trainers/moduleThree/DistributeWords").then(m => ({ default: m.DistributeWords })));
const ConnectItems = lazy(() => import("../trainers/ConnectItems").then(m => ({ default: m.ConnectItems })));
const AnagramPuzzle = lazy(() => import("../trainers/AnagramPuzzle").then(m => ({ default: m.AnagramPuzzle })));
import { mockConclusionData, mockDataColorTools, mockDataColorWords, mockDataPoliteWords, mockDataWordClick } from "../mocks/data";

// eslint-disable-next-line react-refresh/only-export-components
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense
        fallback={
            <div className="flex items-center justify-center min-h-screen">
                loading...
            </div>
        }
    >
        {children}
    </Suspense>
);
export const router = createBrowserRouter([
    {
        path: '/',
        element: <SuspenseWrapper>
            <Main />
        </SuspenseWrapper>,
    },
    {
        path: '/:id',
        element: <SuspenseWrapper>
            <Language />
        </SuspenseWrapper>

    },
    {
        path: '/test',
        element: <SuspenseWrapper>

            <Test />
        </SuspenseWrapper>
    },
    {
        path: '/one',
        element: <SuspenseWrapper>

            <One />
        </SuspenseWrapper>
    },
    {
        path: '/two',
        element: <SuspenseWrapper>

            <Two />
        </SuspenseWrapper>
    },
    {
        path: '/three',
        element: <SuspenseWrapper>
            <Three />
        </SuspenseWrapper>
    },
    {
        path: '/four',
        element: <SuspenseWrapper>

            <Four />
        </SuspenseWrapper>
    },
    {
        path: '/five',
        element: <SuspenseWrapper>

            <Five />
        </SuspenseWrapper>
    },
    {
        path: '/six',
        element: <SuspenseWrapper>

            <Six />
        </SuspenseWrapper>
    },
    {
        path: '/seven',
        element: <SuspenseWrapper>

            <Seven />
        </SuspenseWrapper>
    },
    {
        path: '/eight',
        element: <SuspenseWrapper>

            <Eight />
        </SuspenseWrapper>
    },
    {
        path: '/nine',
        element: <SuspenseWrapper>

            <Nine />
        </SuspenseWrapper>
    },
    {
        path: '/ten',
        element: <SuspenseWrapper>

            <Dialog />
        </SuspenseWrapper>
    },
    {
        path: '/theoryChild',
        element: <SuspenseWrapper>

            <TheoryChildPage />
        </SuspenseWrapper>
    },
    {
        path: '/example',
        element: <SuspenseWrapper>
            <Example />
        </SuspenseWrapper>
    },
    {
        path: '/eleven',
        element: <SuspenseWrapper>
            <Eleven />
        </SuspenseWrapper>
    },
    {
        path: '/twelve',
        element: <SuspenseWrapper>

            <Twelve />
        </SuspenseWrapper>
    },
    {
        path: '/therteen',
        element: <SuspenseWrapper>

            <Therteen />
        </SuspenseWrapper>
    },
    {
        path: '/isCorrect',
        element: <SuspenseWrapper>

            <Page>
                <IsCorrect />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/whatIs',
        element: <SuspenseWrapper>

            <Page>
                <WhatIs />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/conclusion',
        element: <SuspenseWrapper>

            <Page>
                <Conclusion data={mockConclusionData} handleError={() => alert('error')} handleSuccess={() => alert('succes')} />
            </Page >
        </SuspenseWrapper>
    },
    {
        path: "/storyPuzzle",
        element: <SuspenseWrapper>

            <Page>
                <StoryPuzzleSolver />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/decryptMessage",
        element: <SuspenseWrapper>

            <Page>
                <DecryptMessage />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/decryptMsgDND",
        element: <SuspenseWrapper>

            <Page>
                <DecryptMsgDND />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/cryptMsg",
        element: <SuspenseWrapper>

            <Page>
                <CryptMessage />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/matchingGame",
        element: <SuspenseWrapper>

            <Page>
                <MatchingGame />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/newWords",
        element: <SuspenseWrapper>

            <Page>
                <NewWords />
            </Page>
        </SuspenseWrapper>
    },
    // {
    //     path: "/testDnd",
    //     element: <Page>
    //         <TestDnd />
    //     </Page>
    // },
    {
        path: "/laco",
        element: <SuspenseWrapper>
            <Page>
                <LineDragApp />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/reorder",
        element: <SuspenseWrapper>
            <Page>
                <Reorder />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/storyReorder",
        element: <SuspenseWrapper>
            <Page>
                <StoryReorder />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/flowT",
        element: <SuspenseWrapper>

            <Page>
                <WrappedFlow />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/vocabularyTrainer",
        element: <SuspenseWrapper>

            <Page>
                <VocabularyTrainer />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/fixTicket",
        element: (
            <SuspenseWrapper>
                <Page>
                    <FixTicket />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/paragraphIndentTrainer",
        element: (
            <SuspenseWrapper>
                <Page>
                    <ParagraphIndentTrainer />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/signToWordMatcher",
        element: (
            <SuspenseWrapper>
                <Page>
                    <SignToWordMatcher />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/FixMistakesInText",
        element: (
            <SuspenseWrapper>
                <Page>
                    <FixMistakesWrapper />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/textArchitect",
        element: (
            <SuspenseWrapper>
                <Page>
                    <TextArchitect />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/xarrows",
        element: (
            <SuspenseWrapper>
                <Page>
                    <LaceApp />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/choiceCorrectItems",
        element: (
            <SuspenseWrapper>
                <Page>
                    <ChoiceCorrectItems />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/politeWordsClicker",
        element: (
            <SuspenseWrapper>
                <Page>
                    <PoliteWordsClicker
                        correctValues={mockDataPoliteWords.correctValues}
                        text={mockDataPoliteWords.text}
                        title={mockDataPoliteWords.title}
                        handleError={() => alert("error")}
                        handleSuccess={() => alert("success")}
                    />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/wordCategorizer",
        element: (
            <SuspenseWrapper>
                <Page>
                    <WordCategorizer />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/colorWords",
        element: (
            <SuspenseWrapper>
                <Page>
                    <ColorWords
                        data={mockDataColorWords}
                        tools={mockDataColorTools}
                        handleSuccess={() => alert('success')}
                        handleError={() => alert('error')}
                        title="Раскрась слова"
                    />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/sentenceBuilder",
        element: (
            <SuspenseWrapper>
                <Page>
                    <SentenceBuilder />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/syllableBuilder",
        element: (
            <SuspenseWrapper>
                <Page>
                    <SyllableBuilder />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/nextSyllableChooser",
        element: (
            <SuspenseWrapper>
                <Page>
                    <NextSyllableChooser />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/bubbleTrainer",
        element: (
            <SuspenseWrapper>
                <Page>
                    <BubbleTrainer />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/letterSoundCategorizer",
        element: (
            <SuspenseWrapper>
                <Page>
                    <LetterSoundCategorizer title="выберите гласные буквы" />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/reorderLetters",
        element: (
            <SuspenseWrapper>
                <Page>
                    <ReorderLetters />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/alphabeticalSorter",
        element: (
            <SuspenseWrapper>
                <Page>
                    <AlphabeticalSorter />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/connectLetters",
        element: (
            <SuspenseWrapper>
                <Page>
                    <ConnectLetters />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/solveRiddle",
        element: (
            <SuspenseWrapper>
                <Page>
                    <SolveRiddle />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/wordCliker",
        element: (
            <SuspenseWrapper>
                <Page>
                    <WordClickerWithWrapper data={mockDataWordClick} />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/whatIsSpeech",
        element: (
            <SuspenseWrapper>
                <Page>
                    <WhatIsSpeech />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/alphabet",
        element: (
            <SuspenseWrapper>
                <Page>
                    <AlphabetCard />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/extraLetter",
        element: (
            <SuspenseWrapper>
                <Page>
                    <DeleteExtraLetter content="ЧАЯЙ" extraLetters={["Я"]} />
                </Page>
            </SuspenseWrapper>
        )
    },
    {
        path: "/findMistake",
        element: <SuspenseWrapper>

            <Page>
                <FindMistake />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/collectPhrases",
        element: <SuspenseWrapper>
            <Page>
                <CollectPhrases />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: "/distributeWords",
        element: <SuspenseWrapper>
            <Page>
                <DistributeWords />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/connectItems',
        element: <SuspenseWrapper>
            <Page>
                <ConnectItems />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/unitCounter',
        element: <SuspenseWrapper>
            <Page>
                <UnitCounter
                    content="редька"
                    correctVariant={5}
                    variants={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    handleError={() => alert('error')}
                    handleSuccess={() => alert('success')}
                    title="Сколько звуков в слове?" />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/letterRecognitionTrainer',
        element: <SuspenseWrapper>
            <Page>
                <LetterRecognitionTrainer
                    title="Распредели слова"
                    columns={[
                        { btnLabel: "Слышу [Й]", value: true },
                        { btnLabel: "Не слышу", value: false }
                    ]}
                    items={
                        [
                            { "id": 1, "content": "Лайка", "correctValue": true, "media": "/sounds/dog.mp3" },
                            { "id": 2, "content": "Стол", "correctValue": false, "media": "/sounds/table.mp3" },
                            { "id": 3, "content": "Чайка", "correctValue": true, "media": "/sounds/table.mp3" }
                        ]
                    }
                    onSuccess={() => alert('Ура!')}
                    onError={() => alert('Fail')} />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/testPuzzleT',
        element: <SuspenseWrapper>
            <Page>
                <PuzzleGame />
            </Page>
        </SuspenseWrapper>
    },
    {
        path: '/anagramPuzzle',
        element: <SuspenseWrapper>
            <Page>
                <AnagramPuzzle />
            </Page>
        </SuspenseWrapper>
    }
])
