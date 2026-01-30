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
// import { PictureWordMatcher } from "../trainers/moduleThree/PictureWordMatcher";
import LineDragApp from "../components/lacotest";
import { Reorder } from "../components/reorder";
import { StoryReorder } from "../trainers/moduleTwo/StoryReorder";
import { WrappedFlow } from "../components/fl";
import { VocabularyTrainer } from "../trainers/moduleTwo/VocabularyTrainer";
import { FixTicket } from "../trainers/moduleTwo/FixTicket";
import { ParagraphIndentTrainer } from "../trainers/moduleTwo/ParagraphIndentTrainer";
import { SignToWordMatcher } from "../trainers/moduleTwo/SignToWordMatcher";
import { TextArchitect } from "../trainers/moduleTwo/TextArchitect";
import LaceApp from "../components/xarrows";
import { ChoiceCorrectItems } from "../trainers/moduleTwo/ChoiceCorrectItems";
import { PoliteWordsClicker } from "../trainers/moduleTwo/PoliteWordsClicker";
import { WordCategorizer } from "../trainers/moduleThree/wordCategorizer";
import { ColorWords } from "../trainers/moduleThree/colorWords";
import { SentenceBuilder } from "../trainers/moduleThree/SentenceBuilder";
import { SyllableBuilder } from "../trainers/moduleThree/SyllableBuilder";
import { NextSyllableChooser } from "../trainers/moduleThree/NextSyllableChooser";
import { BubbleTrainer } from "../trainers/moduleThree/bubbleTrainer";
import { LetterSoundCategorizer } from "../trainers/moduleThree/LetterSoundCategorizer";
import { ReorderLetters } from "../trainers/moduleThree/ReorderLetters";
import { AlphabeticalSorter } from "../trainers/moduleThree/AlphabeticalSorter";
import { ConnectLetters } from "../trainers/moduleThree/ConnectLetters";
import { SolveRiddle } from "../trainers/moduleThree/SolveRiddle";
import { WordClick } from "../trainers/moduleThree/WordClick";
import { WhatIsSpeech } from "../pages/Cards/WhatIsSpeech";
import { AlphabetCard } from "../pages/Cards/Alphabet";
import { DeleteExtraLetter } from "../trainers/moduleThree/DeleteExtraLetter";
import { mockConclusionData, mockDataColorTools, mockDataColorWords, mockDataPoliteWords, mockDataWordClick } from "../mocks/data";
import { FixMistakesWrapper } from "../components/FixMistakesWrapper";
import { FindMistake } from "../trainers/moduleThree/FindMistake";
import { WordClickerWithWrapper } from "../trainers/moduleThree/WordClick/wrapper";
import { DistributeWords } from "../trainers/moduleThree/DistributeWords";

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
                <Conclusion data={mockConclusionData} handleError={() => alert('error')} handleSuccess={() => alert('succes')} handleNext={() => alert('next')} />
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
        element: <Page>
            <LineDragApp />
        </Page>
    },
    {
        path: "/reorder",
        element: <Page>
            <Reorder />
        </Page>
    },
    {
        path: "/storyReorder",
        element: <Page>
            <StoryReorder />
        </Page>
    },
    {
        path: "/flowT",
        element: <Page>
            <WrappedFlow />
        </Page>
    },
    {
        path: "/vocabularyTrainer",
        element: <Page>
            <VocabularyTrainer />
        </Page>
    },
    {
        path: "/fixTicket",
        element: <Page>
            <FixTicket />
        </Page>
    },
    {
        path: "/paragraphIndentTrainer",
        element: <Page>
            <ParagraphIndentTrainer />
        </Page>
    },
    {
        path: "/signToWordMatcher",
        element: <Page>
            <SignToWordMatcher />
        </Page>
    },
    {
        path: "/FixMistakesInText",
        element: <Page>
            <FixMistakesWrapper />
        </Page>
    },
    {
        path: "/textArchitect",
        element: <Page>
            <TextArchitect />
        </Page>
    },
    {
        path: "/xarrows",
        element: <Page>
            <LaceApp />
        </Page>
    },
    {
        path: "/choiceCorrectItems",
        element: <Page>
            <ChoiceCorrectItems />
        </Page>
    },
    {
        path: "/politeWordsClicker",
        element: <Page>
            <PoliteWordsClicker
                correctValues={mockDataPoliteWords.correctValues}
                text={mockDataPoliteWords.text}
                title={mockDataPoliteWords.title} />
        </Page>
    },
    {
        path: "/wordCategorizer",
        element: <Page>
            <WordCategorizer />
        </Page>
    },
    {
        path: "/colorWords",
        element: <Page>
            <ColorWords
                data={mockDataColorWords}
                tools={mockDataColorTools}
                handleSuccess={() => alert('success')}
                handleError={() => alert('error')}
                title="Раскрась слова" />
        </Page>
    },
    {
        path: "/sentenceBuilder",
        element: <Page>
            <SentenceBuilder />
        </Page>
    },
    {
        path: "/syllableBuilder",
        element: <Page>
            <SyllableBuilder />
        </Page>
    },
    {
        path: "/nextSyllableChooser",
        element: <Page>
            <NextSyllableChooser />
        </Page>
    },
    {
        path: "/bubbleTrainer",
        element: <Page>
            <BubbleTrainer />
        </Page>
    },
    {
        path: "/letterSoundCategorizer",
        element: <Page>
            <LetterSoundCategorizer title="выберите гласные буквы" />
        </Page>
    }, {
        path: "/reorderLetters",
        element: <Page>
            <ReorderLetters />
        </Page>
    },
    {
        path: "/alphabeticalSorter",
        element: <Page>
            <AlphabeticalSorter />
        </Page>
    },
    {
        path: "/connectLetters",
        element: <Page>
            <ConnectLetters />
        </Page>
    },
    {
        path: "/solveRiddle",
        element: <Page>
            <SolveRiddle />
        </Page>
    },
    {
        path: "/wordCliker",
        element: <Page>
            <WordClickerWithWrapper data={mockDataWordClick} />
        </Page>
    },
    {
        path: "/whatIsSpeech",
        element: <Page>
            <WhatIsSpeech />
        </Page>
    },
    {
        path: "/alphabet",
        element: <Page>
            <AlphabetCard />
        </Page>
    },
    {
        path: "/extraLetter",
        element: <Page>
            <DeleteExtraLetter content="ЧАЯЙ" extraLetters={["Я"]} />
        </Page>
    },
    {
        path: "/findMistake",
        element: <Page>
            <FindMistake />
        </Page>
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
    }
])
