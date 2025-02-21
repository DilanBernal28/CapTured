import { Token } from './token';
export interface IApiResponseArray<T> {
    status: number,
    body: T[],
}
export interface IApiResponse<T> {
    status: number,
    body: T
}