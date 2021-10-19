import { IHill } from "../../../components/Hill/interfaces/IHill";
import { IPagintation } from "./IPagination";

export interface IHomeState {
    hills: IHill[]
    hill: IHill,
    showModal: boolean,
    nextPage: IPagintation | undefined,
    previousPage: IPagintation | undefined
}
