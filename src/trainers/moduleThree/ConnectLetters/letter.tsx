import cn from 'classnames';
import './styles.scss';

export const Letter = ({ content = 'a', coordinates = { x: 0, y: 0 }, selected }: { content: string; coordinates: { x: number; y: number; }; selected: boolean; }) => {
    return <>

        <div className={cn("Letter", selected && "selected")} style={{ left: coordinates.x, top: coordinates.y }}>
            <div className="Letter__center">
                {content}
            </div>
        </div>
    </>
}