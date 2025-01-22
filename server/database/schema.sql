-- Create Users Table
CREATE TABLE public."Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50) DEFAULT 'user'
);

-- Create Projects Table
CREATE TABLE public."Projects" (
    id SERIAL PRIMARY KEY,
    description TEXT,
    name VARCHAR(255) DEFAULT 'Untitled Project' NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "ownerId" INTEGER NOT NULL REFERENCES public."Users"(id) ON DELETE CASCADE
);

-- Create Project Members Table
CREATE TABLE public."ProjectMembers" (
    "projectId" INTEGER NOT NULL REFERENCES public."Projects"(id) ON DELETE CASCADE,
    "userId" INTEGER NOT NULL REFERENCES public."Users"(id) ON DELETE CASCADE,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("projectId", "userId")
);

-- Create Tasks Table
CREATE TABLE public."Tasks" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'todo' NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' NOT NULL,
    "projectId" INTEGER REFERENCES public."Projects"(id) ON DELETE CASCADE,
    "assigneeId" INTEGER REFERENCES public."Users"(id) ON DELETE SET NULL,
    "createdBy" INTEGER REFERENCES public."Users"(id) ON DELETE SET NULL,
    "dueDate" TIMESTAMP,
    estimated_hours NUMERIC(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Time Logs Table
CREATE TABLE public."TimeLogs" (
    id SERIAL PRIMARY KEY,
    "taskId" INTEGER REFERENCES public."Tasks"(id) ON DELETE CASCADE,
    "userId" INTEGER REFERENCES public."Users"(id) ON DELETE CASCADE,
    hours_logged NUMERIC(5,2) NOT NULL,
    description TEXT,
    date_logged DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Comments Table
CREATE TABLE public."Comments" (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    "taskId" INTEGER REFERENCES public."Tasks"(id) ON DELETE CASCADE,
    "userId" INTEGER REFERENCES public."Users"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Attachments Table
CREATE TABLE public."Attachments" (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(255),
    file_size INTEGER,
    "taskId" INTEGER REFERENCES public."Tasks"(id) ON DELETE CASCADE,
    "uploadedBy" INTEGER REFERENCES public."Users"(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create SequelizeMeta Table
CREATE TABLE public."SequelizeMeta" (
    name VARCHAR(255) NOT NULL PRIMARY KEY
);

-- ENUM Types for Status and Priority
CREATE TYPE public."enum_Projects_status" AS ENUM (
    'planning',
    'active',
    'completed',
    'on-hold'
);

CREATE TYPE public."enum_Tasks_priority" AS ENUM (
    'low',
    'medium',
    'high'
);

CREATE TYPE public."enum_Tasks_status" AS ENUM (
    'todo',
    'in-progress',
    'completed'
);

-- Set Ownerships
ALTER TYPE public."enum_Projects_status" OWNER TO dgold;
ALTER TYPE public."enum_Tasks_priority" OWNER TO dgold;
ALTER TYPE public."enum_Tasks_status" OWNER TO dgold;

-- Sequences
CREATE SEQUENCE public."Users_id_seq" AS INTEGER START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;

CREATE SEQUENCE public."Projects_id_seq" AS INTEGER START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public."Projects_id_seq" OWNED BY public."Projects".id;

CREATE SEQUENCE public."Tasks_id_seq" AS INTEGER START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public."Tasks_id_seq" OWNED BY public."Tasks".id;

CREATE SEQUENCE public."TimeLogs_id_seq" AS INTEGER START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public."TimeLogs_id_seq" OWNED BY public."TimeLogs".id;

CREATE SEQUENCE public."Comments_id_seq" AS INTEGER START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public."Comments_id_seq" OWNED BY public."Comments".id;

CREATE SEQUENCE public."Attachments_id_seq" AS INTEGER START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public."Attachments_id_seq" OWNED BY public."Attachments".id;
