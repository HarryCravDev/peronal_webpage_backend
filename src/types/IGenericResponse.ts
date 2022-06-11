export interface IGenericResponse {
    success: boolean;
    message: string;
    data?: any[] | string | number;
}