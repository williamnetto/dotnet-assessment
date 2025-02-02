import customAxios from './customAxios';
import { Department } from '../types/Department';

export const getAllDepartments = async (): Promise<Department[]> => {
    try {
        const response = await customAxios.get('department');
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};