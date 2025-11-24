import { useAppSelector } from "../../redux";
import { Theory } from "./Theory/theory"
import './main.scss';
// import { Practice } from "./Practice/practice";
export const ExampleOfLearningForChildren = () => {
    const { status } = useAppSelector(state => state.learningReducer);
    console.log(status);
    return (
        <section className="Card">

            <div className="ExampleOfLearningForChildren">
                <Theory />
            </div>
        </section>
    )
}