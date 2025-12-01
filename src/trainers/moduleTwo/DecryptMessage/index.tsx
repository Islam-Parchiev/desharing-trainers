import { TrainerTitle } from '../../../components/TrainerTitle';
import { Button } from '../../../shared/ui/Button';
import { CryptItem } from './CryptItem';
import './styles.scss';
import { useDecryptMessage } from './useDecryptMessage';

export const DecryptMessage = () => {
    const { currentItem, data, handleAnswer, variants, status } = useDecryptMessage();
    return (
        <div className='DecryptMessage__wrapper'>
            {

                status !== "finish" ? <>
                    <div className="DecryptMessage__cryptWindow">
                        <div className="DecryptMessage__cryptWindow_inner">
                            <ul className="list-reset DecryptMessage__crypt_items">
                                {data.map(item => (
                                    <CryptItem
                                        key={item.id}
                                        type={item.value}
                                        selected={currentItem.id === item.id}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="DecryptMessage__content">
                        <div className="DecryptMessage__content_inner">
                            {status === "error" && "Error"}
                            <TrainerTitle>
                                Догадайся, что означает данный элемент
                            </TrainerTitle>

                            <ul className="list-reset DecryptMessage__variants">
                                {
                                    variants.map(variant => (
                                        <Button
                                            asChild
                                            variant="primary"
                                            size="small"
                                            onClick={() => handleAnswer(variant)}
                                        >
                                            <li>
                                                {variant.value}
                                            </li>
                                        </Button>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </> :
                    <div>
                        Finish
                    </div>
            }
        </div>
    );
};