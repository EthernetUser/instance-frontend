export default interface IResponse<T> {
    status?: number;
    error?: boolean;
    message?: string;
    data: T;
}