import type { Variant } from "../App";
import type { ChoiceRightVariant } from "../trainers/moduleOne/ChoiceMultipleVariants";

export type Id = string | number;
export type Status = "success" | "error" | "idle"|"finish";
interface ChoiceMultipleVariants {
    type:"ChoiceMultipleVariants";
    data:ChoiceRightVariant;
}
interface IChoiceRightVariant {
    type:"ChoiceRightVariant";
   data:{
    id:Id;
     title:string;
    variants:Variant[];
    correctVariantId:number;
   }
}
export type TrainerTypes = ChoiceMultipleVariants | IChoiceRightVariant