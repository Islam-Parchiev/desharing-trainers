import { createBrowserRouter } from "react-router-dom";
import { NativeLanguage } from "../pages/NativeLanguage";
import { Language } from "../pages/Language";
import { Test } from "../pages/Test";
import { One } from "../pages/one";
import { Two } from "../pages/two";
import { Three } from "../pages/three";
import { Four } from "../pages/four";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NativeLanguage />
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
    }
])