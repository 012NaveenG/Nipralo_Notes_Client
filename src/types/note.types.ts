
interface Note {
    id?: number;
    title: string;
    content: string;
    createdBy?: number;
    createdAt?: string;   // ISO timestamp from backend
    updatedAt?: string;   // ISO timestamp from backend
}

interface CollaboratorForm {
    email: string;
    noteId: number
}
export type { Note, CollaboratorForm }