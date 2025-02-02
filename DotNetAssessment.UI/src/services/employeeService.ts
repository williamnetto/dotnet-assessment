import customAxios from './customAxios';
import { Employee } from '../types/Employee';

export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await customAxios.get('employee');
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const deleteEmployee = async (id: number): Promise<void> => {
    try {
        await customAxios.delete(`employee/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;  
    }
};

export const createEmployee = async (newEmployee: Employee): Promise<Employee> => {
    try {
        const response = await customAxios.post('employee', newEmployee);
        return response.data; 
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error; 
    }
};

export const updateEmployeeDepartment = async (employee: Employee): Promise<Employee> => {
    try {
        const response = await customAxios.put(`employee/${employee.id}`, employee);
        return response.data;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
};


