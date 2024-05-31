export interface CarUserResponse {
    id: string,
    plate: string,
    manufacture: string,
    model: string,
    rate: string,
    description: string,
    transmission: string,
    type: string,
    year: number,
    options: string[],
    specs: string[],
    availableDate: Date,
    createdAt: Date,
    updatedAt: Date
}