// сделать рефакторинг улучшить и упростить код
import { useState } from 'react'
import { Button } from '../../../shared/ui/Button'
import './styles.scss'
import type { Status } from '../../../types/types'
const mockData = {
    text: [
        { content: 'Утро на острове.', correct: ['start', 'word', 'word', 'end'] },
        { content: 'Тихо.', correct: ['start', 'end'] },
        { content: 'Днём отправимся в джунгли.', correct: ['start', 'word', 'word', 'word', 'end'] },
    ],
}

type IAD = 'start' | 'word' | 'end' | '!' | '?'
interface Slot {
    items: IAD[]
}
export const TextArchitect = () => {
    const [slots, setSlots] = useState<Slot[]>(Array.from({ length: mockData.text.length }, () => ({ items: [] })))
    const [status, setStatus] = useState<Status>('idle')
    const [data] = useState(mockData)
    const [currentData, setCurrentData] = useState(0)
    console.log(slots)
    const handleRemove = () => {
        setSlots(prev => {
            const newSlots = prev.map((slot, index) => {
                if (index === currentData) {
                    return {
                        ...slot,
                        items: slot.items.slice(0, -1),
                    }
                }
                return slot
            })
            return newSlots
        })
    }
    // const handleReset = ()=> {

    // }
    const handleCheck = () => {
        if (slots[currentData].items.length !== mockData.text[currentData].correct.length) {
            setStatus('error')
            return
        } else {
            setStatus('success')
            setCurrentData(prev => prev + 1)
            return
        }
        setStatus('idle')
        return
    }
    const handlePushInSlot = (item: IAD) => {
        setSlots(prev => {
            const newSlots = [...prev]
            newSlots[currentData] = {
                ...newSlots[currentData],
                items: [...newSlots[currentData].items, item],
            }
            return newSlots
        })
    }
    return (
        <div className="TextArchitect">
            <div className="TextArchitect__inner">
                <div className="TextArchitect__text">
                    <div className="TextArchitect__text_sentence">
                        {data.text.map((item, index) => (
                            <span className={currentData === index ? 'active' : ''}>{item.content}</span>
                        ))}
                    </div>
                    {status === 'error' && 'Error'}
                </div>
                <div className="TextArchitectScheme">
                    <div className="TextArchitectScheme__inner">
                        {slots.map(slot => (
                            <div className="TextArchitectSchemeSlot">
                                {slot.items.map(item => {
                                    if (item === 'start') {
                                        return (
                                            <span className="TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-start"></span>
                                        )
                                    } else if (item === 'word') {
                                        return (
                                            <span className="TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-word"></span>
                                        )
                                    } else if (item === 'end') {
                                        return (
                                            <span className="TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-end"></span>
                                        )
                                    } else if (item === '!') {
                                        return (
                                            <span className="TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-mark"></span>
                                        )
                                    } else if (item === '?') {
                                        return (
                                            <span className="TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-question"></span>
                                        )
                                    } else {
                                        console.log('error')
                                        return
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="TextArchitect__controls">
                    <Button variant="primary" onClick={() => handlePushInSlot('start')}>
                        |_
                    </Button>
                    <Button variant="primary" onClick={() => handlePushInSlot('word')}>
                        _
                    </Button>
                    <Button variant="primary" onClick={() => handlePushInSlot('end')}>
                        .
                    </Button>
                    <Button variant="primary" onClick={() => handlePushInSlot('!')}>
                        !
                    </Button>
                    <Button variant="primary" onClick={() => handlePushInSlot('?')}>
                        ?
                    </Button>
                    <Button variant="primary" onClick={handleRemove}>
                        Стереть
                    </Button>
                    <Button variant="primary">Заново</Button>
                    <Button onClick={handleCheck}>Check</Button>
                </div>
            </div>
        </div>
    )
}
