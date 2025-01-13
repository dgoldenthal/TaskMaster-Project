// src/types/index.ts

// Export the User interface directly, removing the import
export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin'; // Add other roles as needed
}

// Extend the Express namespace to include the User type on the Request object
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Define the Project interface
export interface Project {
  id: number;
  title: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate?: Date;
  dueDate?: Date;
  ownerId: number;
  progress?: number;
}

// DTO for creating a project
export interface CreateProjectDto {
  title: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate?: Date;
  dueDate?: Date;
}

// DTO for updating a project
export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

// Define the Task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: {
    id: number;
    username: string;
  };
}

// Interface for drag-and-drop results
export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
}