import { Department } from './Department';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  address: string;
  departmentId: number;
  department: Department;
}