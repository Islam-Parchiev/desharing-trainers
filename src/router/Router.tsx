import { createBrowserRouter } from "react-router-dom";
import { NativeLanguage } from "../pages/NativeLanguage";
import { Language } from "../pages/Language";
import { Test } from "../pages/Test";

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
    }
])