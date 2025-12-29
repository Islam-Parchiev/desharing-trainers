import { createBrowserRouter } from "react-router-dom";
// import { NativeLanguage } from "../pages/NativeLanguage";
import { Language } from "../pages/Language";
import { Test } from "../pages/Test";
import { One } from "../pages/one";
import { Two } from "../pages/two";
import { Three } from "../pages/three";
import { Four } from "../pages/four";
import { Five } from "../pages/five";
import { Six } from "../pages/six";
import { Seven } from "../pages/seven";
import { Eight } from "../pages/eight";
import { Main } from "../pages/Main";
import { TheoryChildPage } from "../pages/theoryChild";
import { Nine } from "../pages/nine";
import { Dialog } from "../pages/dialog";
import { Example } from "../pages/Example";
import { Eleven } from "../pages/eleven";
import { Twelve } from "../pages/twelve";
import { Therteen } from "../pages/therteen";
import { Page } from "../pages/page";
import { IsCorrect } from "../trainers/moduleTwo/IsCorrect";
import { WhatIs } from "../trainers/moduleTwo/WhatIs";
import { Conclusion } from "../trainers/moduleTwo/Сonclusion";
import { StoryPuzzleSolver } from "../trainers/moduleTwo/StoryPuzzleSolver";
import { DecryptMessage } from "../trainers/moduleTwo/DecryptMessage";
import { DecryptMsgDND } from "../trainers/moduleTwo/DecryptMsgDND";
import { CryptMessage } from "../trainers/moduleTwo/CryptMessage";
import { MatchingGame } from "../trainers/moduleTwo/MatchingGame";
import { NewWords } from "../trainers/moduleTwo/NewWords";
// import TestDnd from "../components/testdnd";
import LineDragApp from "../components/lacotest";
import { Reorder } from "../components/reorder";
import { StoryReorder } from "../trainers/moduleTwo/StoryReorder";
import { WrappedFlow } from "../components/fl";
import { VocabularyTrainer } from "../trainers/moduleTwo/VocabularyTrainer";
import { FixTicket } from "../trainers/moduleTwo/FixTicket";
import { ParagraphIndentTrainer } from "../trainers/moduleTwo/ParagraphIndentTrainer";
import { SignToWordMatcher } from "../trainers/moduleTwo/SignToWordMatcher";
import { FixMistakesInText } from "../trainers/moduleTwo/fixMistakesInText";
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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />
    },
    {
        path: '/:id',
        element: <Language />
    },
    {
        path: '/test',
        element: <Test />
    },
    {
        path: '/one',
        element: <One />
    },
    {
        path: '/two',
        element: <Two />
    },
    {
        path: '/three',
        element: <Three />
    },
    {
        path: '/four',
        element: <Four />
    },
    {
        path: '/five',
        element: <Five />
    },
    {
        path: '/six',
        element: <Six />
    },
    {
        path: '/seven',
        element: <Seven />
    },
    {
        path: '/eight',
        element: <Eight />
    },
    {
        path: '/nine',
        element: <Nine />
    },
    {
        path: '/ten',
        element: <Dialog />
    },
    {
        path: '/theoryChild',
        element: <TheoryChildPage />
    },
    {
        path: '/example',
        element: <Example />
    },
    {
        path: '/eleven',
        element: <Eleven />
    },
    {
        path: '/twelve',
        element: <Twelve />
    },
    {
        path: '/therteen',
        element: <Therteen />
    },
    {
        path: '/isCorrect',
        element: <Page>
            <IsCorrect />
        </Page>
    },
    {
        path: '/whatIs',
        element: <Page>
            <WhatIs />
        </Page>
    },
    {
        path: '/conclusion',
        element: <Page>
            <Conclusion />
        </Page>
    },
    {
        path: "/storyPuzzle",
        element: <Page>
            <StoryPuzzleSolver />
        </Page>
    },
    {
        path: "/decryptMessage",
        element: <Page>
            <DecryptMessage />
        </Page>
    },
    {
        path: "/decryptMsgDND",
        element: <Page>
            <DecryptMsgDND />
        </Page>
    },
    {
        path: "/cryptMsg",
        element: <Page>
            <CryptMessage />
        </Page>
    },
    {
        path: "/matchingGame",
        element: <Page>
            <MatchingGame />
        </Page>
    },
    {
        path: "/newWords",
        element: <Page>
            <NewWords />
        </Page>
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
            <FixMistakesInText />
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
            <PoliteWordsClicker />
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
            <ColorWords />
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
    }
])
