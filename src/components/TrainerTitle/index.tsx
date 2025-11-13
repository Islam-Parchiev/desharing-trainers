import type { ReactNode } from "react"
import { Icon } from "../../shared/ui/MoveBox"
import './styles.scss';
export const TrainerTitle = ({ children }: { children: ReactNode; }) => {
    return <span className="TrainerTitle">
        <button className="btn-reset TrainerTitle__sound"> <Icon /></button>
        <h2 className="TrainerTitle__content">{children}</h2>
    </span>
}