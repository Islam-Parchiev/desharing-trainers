import { type ReactNode } from "react"
import { AttestationItem } from "../../components/AttestationItem"
import styles from './styles.module.scss';
import type { Status } from "../../types/types";
export const Card = ({ children, currentTaskNumber, status, trainersLength }: { children: ReactNode; status: Status; currentTaskNumber: number; trainersLength: number }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <button
                    className={`btn-reset ${styles.backBtn}`}
                    aria-label="Go back"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.9502 12.9492C19.5025 12.9492 19.9502 12.5015 19.9502 11.9492C19.9502 11.3969 19.5025 10.9492 18.9502 10.9492L18.9502 12.9492ZM4.24309 11.2421C3.85256 11.6326 3.85256 12.2658 4.24309 12.6563L10.607 19.0203C10.9976 19.4108 11.6307 19.4108 12.0213 19.0203C12.4118 18.6298 12.4118 17.9966 12.0213 17.6061L6.36441 11.9492L12.0213 6.29236C12.4118 5.90184 12.4118 5.26867 12.0213 4.87815C11.6307 4.48763 10.9976 4.48763 10.6071 4.87815L4.24309 11.2421ZM18.9502 10.9492L4.9502 10.9492L4.9502 12.9492L18.9502 12.9492L18.9502 10.9492Z" fill="#303030" />
                    </svg>
                </button>
                <AttestationItem
                    active={status === 'idle'}
                    current={currentTaskNumber}
                    max={trainersLength}
                />
            </div>

            <div className={styles.main}>
                {children}
            </div>
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            {status === "finish" && "Finish"}
        </div>
    )
}