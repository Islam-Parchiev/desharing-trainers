import './styles.scss';
export const TextWhatIs = () => {
    const val = "text";
    const ex = 'Test text ipsum lorem';
    const parsedData = ex.split(" ").find(word => word === val);
    return (
        <div className='TextWhatIs'>

        </div>
    )
}