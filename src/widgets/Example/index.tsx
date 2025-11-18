import { useAppSelector } from "../../redux";
import { Theory } from "./Theory/theory"
import './main.scss';
import { Practice } from "./Practice/practice";
export const ExampleOfLearningForChildren = () => {
    const { status } = useAppSelector(state => state.learningReducer);
    return (
        <section className="Card">

            <div className="ExampleOfLearningForChildren">
                {status === "theory" ? <Theory /> : status === "practice" ? <Practice /> : "error"}
            </div>
        </section>
    )
}