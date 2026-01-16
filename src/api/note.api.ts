import axios, { AxiosError } from "axios";
import type { Note } from "../types/note.types";

interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

const fetchNoteByUserId = async (): Promise<Note[]> => {
    const response = await axios.get<ApiResponse<Note[]>>(
        "/api/v1/notes/get-user-notes"
    );

    return response.data.data; // <-- IMPORTANT
};

export { fetchNoteByUserId };
