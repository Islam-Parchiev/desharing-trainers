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
        path: '/theoryChild',
        element: <TheoryChildPage />
    }
])