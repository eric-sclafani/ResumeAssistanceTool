export default interface Result<T> {
    success: boolean;
    data: T;
    message: string;
}
