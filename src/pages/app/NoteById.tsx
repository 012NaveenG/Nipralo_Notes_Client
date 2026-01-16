import { useParams } from "react-router-dom";
import { Group } from "../../components/ui/Group.tsx";
import { Input } from "../../components/ui/Input.tsx";
import Textarea from "../../components/ui/Textarea.tsx";
import { useEffect, useState } from "react";
import { fetchNoteByNoteId } from "../../api/note.api.ts";
import type { Note } from "../../types/note.types.ts";
import toast from "react-hot-toast";

const NoteById = () => {
    const { noteId } = useParams<{ noteId: string }>();
    const [noteData, setNoteData] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!noteId) return;

        const loadNoteData = async () => {
            try {
                setLoading(true);
                const data = await fetchNoteByNoteId(noteId);
                setNoteData(data);
            } catch (error: any) {
                toast.error(error.message || "Failed to load note");
            } finally {
                setLoading(false);
            }
        };

        loadNoteData();
    }, [noteId]);


    return (
        <div className="w-full h-full shadow-input p-10">
            <div className="max-w-2xl mx-auto flex items-center justify-end gap-1">
                <Avatar />
            </div>

            {
                loading ? <NoteEditorSkeleton />
                    : (
                        noteData ? <form className="max-w-2xl mx-auto ">

                            <Group>
                                <Input
                                    value={noteData?.title}
                                    onChange={(e) => {
                                        setNoteData(prev =>
                                            prev ? { ...prev, title: e.target.value } : prev
                                        );
                                    }}

                                />
                            </Group>
                            <Group>
                                <Textarea
                                    rows={10}
                                    value={noteData?.content}
                                    onChange={(e) => {
                                        setNoteData(prev =>
                                            prev ? { ...prev, content: e.target.value } : prev
                                        );
                                    }}
                                />
                            </Group>

                        </form>
                            :
                            <div className="h-full w-full flex items-center justify-center">
                                <p>Something went wrong</p>
                            </div>
                    )
            }

        </div>
    );
};

export default NoteById;


const Avatar = () => {
    return (
        <div className="size-10 bg-pink-300 rounded-full p-2 flex items-center justify-center border-4 border-gray-200">
            N
        </div>
    )
}


const NoteEditorSkeleton = () => {
    return (
        <div className="w-full h-full shadow-input p-10 animate-pulse">
            {/* Avatar */}
            <div className="max-w-2xl mx-auto flex justify-end mb-6">
                <div className="size-10 rounded-full bg-neutral-300" />
            </div>

            {/* Title */}
            <div className="max-w-2xl mx-auto mb-4">
                <div className="h-10 w-full rounded bg-neutral-300" />
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto space-y-3">
                <div className="h-4 w-full rounded bg-neutral-200" />
                <div className="h-4 w-full rounded bg-neutral-200" />
                <div className="h-4 w-11/12 rounded bg-neutral-200" />
                <div className="h-4 w-10/12 rounded bg-neutral-200" />
                <div className="h-4 w-full rounded bg-neutral-200" />
            </div>
        </div>
    );
};
