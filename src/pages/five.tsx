import { useState } from "react"
import { ChoiceRightImage, type ImageVariant } from "../trainers/ChoiceRightImage"
import type { Status } from "../types/types"
import { Button } from "../shared/ui/Button"

export const Five = () => {
    const [imageVariants] = useState<ImageVariant[]>([
        {
            id: 1,
            imageUrl: "/а.jpg",
            correct: false,
        },
        {
            id: 2,
            imageUrl: "/б.jpg",
            correct: true,
        },
        {
            id: 3,
            imageUrl: "/в.jpg",
            correct: false,
        }
    ])
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleRetry = () => {
        setStatus("idle");
        setIsSubmitted(false);
    }
    const handleNext = () => {
        console.log('next');
    }
    const [status, setStatus] = useState<Status>("idle")
    return <main>
        <div className="ChoiceRightImage__wrapper">

            <ChoiceRightImage isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} setStatus={setStatus} title="Нажмите на Б" variants={imageVariants} key={`ChoiceRightImage-trainer`} />
            {status === "error" && (<>

                <div>Error</div>
                <Button onClick={handleRetry}>Retry</Button>
            </>
            )}
            {status === "success" && <>

                <div>success</div>
                <Button onClick={handleNext} >Next</Button>
            </>}
        </div>
    </main>
}