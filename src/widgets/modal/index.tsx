import ReactDOM from 'react-dom';
import type { ReactNode } from 'react';
import './styles.scss';
import { Button } from '../../shared/ui/Button';
export const Modal = ({ children, onClose }: { children: ReactNode; onClose: () => void; }) => {
    return ReactDOM.createPortal(<div className='Modal-overlay' >
        <div className="Modal">
            <Button variant="iconSecondary" size="iconSmall" className='Modal__close' onClick={onClose}>x</Button>
            {children}
        </div>
    </div>,
        document.body,
    )
}