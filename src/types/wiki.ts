export type Department = 'atendimento' | 'ti' | 'financeiro' | 'estoque' | 'admin';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  departments: Department[];
  role: UserRole;
}

export interface WikiSection {
  id: string;
  title: string;
  department: Department;
  subsections: WikiSubsection[];
  order: number;
}

export interface WikiSubsection {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  sectionId: string;
}

export interface ContentRequest {
  id: string;
  title: string;
  content: string;
  department: Department;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
