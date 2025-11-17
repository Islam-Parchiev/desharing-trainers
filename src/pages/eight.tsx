import { useState } from "react"
import { DragAndDrop, type ISlot, type IWord } from "../trainers/DragAndDrop"
import type { Status } from "../types/types"
import { Button } from "../shared/ui/Button"
import { Card } from "../components/Card"

export const Eight = () => {
    const [slots, setSlots] = useState<ISlot[]>([
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
    ])
    const [status, setStatus] = useState<Status>("idle")
    const [words] = useState<IWord[]>([{ id: 1, title: "Мяуканье" }, { id: 2, title: "V8" }, { id: 3, title: "Лай" }])
    const onSuccessDnd = () => {
        setStatus("success");
    }
    const onErrorDnd = () => {
        setStatus("error");
    }
    const handleCheck = () => {
        if (slots.every(slot => slot.current === slot.correctValue)) {
            // setSuccess(true);
            onSuccessDnd();
        } else {
            // setError(true);
            onErrorDnd();
        }
    }
    const handleRetry = () => {
        setStatus("idle");
        setSlots(prev => prev.map(s => ({ ...s, current: null })));
    };
    return (
        <main className="Page Main">
            <section className="MainSection">

                <Card onBack={() => console.log('back')} status="idle">

                    {status === "error" && "Error"}
                    {status === "success" && "Success"}
                    <DragAndDrop type="primary" setSlots={setSlots} slots={slots} words={words} handleError={onErrorDnd} handleSuccess={onSuccessDnd} />
                    <Button variant="primary" onClick={handleCheck}>check</Button>
                    {status === "error" && <Button variant="primary" onClick={handleRetry}>retry</Button>}
                </Card>
            </section>
        </main>
    )
}