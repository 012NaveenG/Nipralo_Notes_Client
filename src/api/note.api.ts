import axios from "axios";
import type { CollaboratorForm, Note } from "../types/note.types";

interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

interface NoteForm {
    title: string;
    content: string
}



const fetchNoteByUserId = async (): Promise<Note[]> => {
    const response = await axios.get<ApiResponse<Note[]>>(
        "/api/v1/notes/get-user-notes"
    );

    return response.data.data; // <-- IMPORTANT
};

const fetchNoteByNoteId = async (noteId: string): Promise<Note> => {
    const response = await axios.get<ApiResponse<Note>>(
        `/api/v1/notes/get-note/${noteId}`
    );

    return response.data.data;
};


const createNote = async (data: NoteForm): Promise<string> => {

    const response = await axios.post(`/api/v1/notes/`, data)
    return response.data?.message
}


const addCollaborator = async (data: CollaboratorForm): Promise<string> => {
    const response = await axios.post('/api/v1/notes/collaborate', data);
    return response.data?.message
}

const fetchSharedNotes = async (): Promise<Note[]> => {
    const response = await axios.get<ApiResponse<Note[]>>(
        "/api/v1/notes/shared-notes"
    );

    return response.data.data; // <-- IMPORTANT
};
export { fetchNoteByUserId, fetchNoteByNoteId, createNote, addCollaborator, fetchSharedNotes };
