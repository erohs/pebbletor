import { INewHill } from "./INewHill";

export interface IHill extends INewHill{
    _id: string,
    name: string,
    description: string,
    author: string
    createdAt: number,
    updatedAt: number
}
