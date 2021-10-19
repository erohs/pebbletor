import { IHill } from "../../../components/Hill/interfaces/IHill";

export interface IHomeState {
    hills: IHill[]
    hill: IHill,
    showModal: boolean
}
