import { Icon } from "../../../shared/ui/MoveBox"
import './style.scss';
export const StoryPuzzleSolver = () => {
    return (
        <div className="StoryPuzzleSolver">
            <div className="StoryPuzzleSolver__inner">
                <div className="StoryPuzzleSolver__dropColumn">
                    <div className="StoryPuzzleSolver__dropColumn_inner">
                        <div className="StoryPuzzleSolver__dropInput">
                            <div className="StoryPuzzleSolver__dropInput_inner">
                                <button className="btn-reset"><Icon /></button>
                                <span>начало</span>
                            </div>
                        </div>
                        <div className="StoryPuzzleSolver__dropInput">
                            <div className="StoryPuzzleSolver__dropInput_inner">
                                <button className="btn-reset"><Icon /></button>
                                <span>основная часть</span>
                            </div>
                        </div>
                        <div className="StoryPuzzleSolver__dropInput">
                            <div className="StoryPuzzleSolver__dropInput_inner">
                                <button className="btn-reset"><Icon /></button>
                                <span>концовка</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="StoryPuzzleSolver__dragColumn">

                </div>
            </div>
        </div>
    )
}