export const WordByImage = () => {
    return (
        <div className="WordByImage">
            <div className="WordByImage__inner">
                <div className="WordByImage__header">
                    <button className="btn-reset">
                        Sound
                    </button>
                    <h3 className="WordByImage__title">
                        Что нарисовано на картинке ? Собери слово из букв
                    </h3>
                </div>
                <div className="WordByImage__image">
                    <img src="/citt.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}