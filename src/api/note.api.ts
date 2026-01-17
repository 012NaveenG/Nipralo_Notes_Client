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
const updateNote = async (
    payload: {
        id: number;
        title: string;
        content: string
    }
): Promise<Note> => {
    const response = await axios.put(`/api/v1/notes/`, payload);

    return response.data.data;
};

const deleteNote = async (id: number): Promise<string> => {
    const response = await axios.delete(`/api/v1/notes/${id}`);
    return response.data?.message


}

export { fetchNoteByUserId, fetchNoteByNoteId, createNote, addCollaborator, fetchSharedNotes, updateNote, deleteNote };
