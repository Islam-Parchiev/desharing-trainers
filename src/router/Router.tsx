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
import TestDnd from "../components/testdnd";
import LineDragApp from "../components/lacotest";

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
    {
        path: "/testDnd",
        element: <Page>
            <TestDnd />
        </Page>
    },
    {
        path: "/laco",
        element: <Page>
            <LineDragApp />
        </Page>
    }
])