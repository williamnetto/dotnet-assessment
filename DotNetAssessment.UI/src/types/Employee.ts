import { Department } from './Department';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate?: string | null;
  phone: string;
  address: string;
  departmentId: number;
  department: Department;
}