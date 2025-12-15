import { Button } from '../../../shared/ui/Button';
import './styles.scss';
const mockData = {
    text: [{ content: "Утро на острове", correct: ["start", "word", "word", "end"] }]
}

export const TextArchitect = () => {
    return (
        <div className="TextArchitect">
            <div className="TextArchitect__inner">
                <div className="TextArchitect__text">
                    <div className="TextArchitect__text_sentence">
                        Утро на острове.
                    </div>
                </div>
                <div className="TextArchitectScheme">
                    <div className="TextArchitectScheme__inner">
                        <div className="TextArchitectSchemeSlot">
                            <span className='TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-start'></span>
                            <span className='TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-word'></span>
                            <span className='TextArchitectSchemeSlot_item TextArchitectSchemeSlot_item-end'></span>
                        </div>
                        <div className="TextArchitectSchemeSlot"></div>
                        <div className="TextArchitectSchemeSlot"></div>
                        <div className="TextArchitectSchemeSlot"></div>
                    </div>
                </div>
                <div className="TextArchitect__controls">
                    <Button variant="primary">|_</Button>
                    <Button variant="primary">_</Button>
                    <Button variant="primary">.</Button>
                    <Button variant="primary">!</Button>
                    <Button variant="primary">?</Button>
                    <Button variant="primary">Стереть</Button>
                    <Button variant="primary">Заново</Button>
                </div>
            </div>
        </div>
    )
}