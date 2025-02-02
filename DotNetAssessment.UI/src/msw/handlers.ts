import { http, HttpResponse } from 'msw';
import { Employee } from '../types/Employee';
import { Department } from '../types/Department';

// Mock data
const mockEmployees: Employee[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', hireDate: '2020-01-01', phone: '1234567890', address: '123 Main St', departmentId: 1, department: { id: 1, name: 'HR' } },
    { id: 2, firstName: 'Jane', lastName: 'Smith', hireDate: '2021-05-15', phone: '9876543210', address: '456 Elm St', departmentId: 2, department: { id: 2, name: 'Engineering' } },
];

const mockDepartments: Department[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Engineering' },
];

// Define the MSW handlers
export const handlers = [
    // Get all employees
    http.get('https://localhost:7081/api/employee', () => {
        return HttpResponse.json(mockEmployees)
    }),

    // Create new employee
    http.post('https://localhost:7081/api/employee', () => {
        return HttpResponse.json({}, {status:201})
    }),

    // Update employee department
    http.put('https://localhost:7081/api/employee/:id', () => {
        return HttpResponse.json({}, {status:201})
    }),

    // Get all departments
    http.get('https://localhost:7081/api/department', () => {
        return HttpResponse.json(mockDepartments)
    }),
];
