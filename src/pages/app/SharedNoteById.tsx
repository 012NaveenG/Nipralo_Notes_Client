import { useParams } from "react-router-dom";
import { Group } from "../../components/ui/Group.tsx";
import { Input } from "../../components/ui/Input.tsx";
import Textarea from "../../components/ui/Textarea.tsx";
import { useEffect, useRef, useState } from "react";
import { fetchNoteByNoteId, updateNote } from "../../api/note.api.ts";
import type { Note } from "../../types/note.types.ts";
import toast from "react-hot-toast";
import { useAuth } from "../../store/user.store.ts";
import { useSocket } from "../../socket/useSocket.ts";
import { debounce } from "../../utils/debounce.ts";



const SharedNoteById = () => {
    const { user } = useAuth();
    const { socket, connectedUsers } = useSocket();
    const { noteId } = useParams<{ noteId: string }>();

    const [noteData, setNoteData] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);

    /* ================= FETCH NOTE ================= */
    useEffect(() => {
        if (!noteId) return;

        const loadNote = async () => {
            try {
                setLoading(true);
                const data = await fetchNoteByNoteId(noteId);
                setNoteData(data);
            } catch (err: any) {
                toast.error(err.message || "Failed to load note");
            } finally {
                setLoading(false);
            }
        };

        loadNote();
    }, [noteId]);

    /* ================= SOCKET JOIN / LEAVE ================= */
    useEffect(() => {
        if (!socket || !noteId || !user) return;

        const join = () => {
            socket.emit("note:join", { noteId, user });
        };

        socket.connected ? join() : socket.once("connect", join);

        socket.on("note:update", (updatedNote: Note) => {
            setNoteData(updatedNote);
            console.log(updateNote)
        });

        return () => {
            socket.emit("note:leave", { noteId });
            socket.off("note:update");
        };
    }, [socket, noteId, user]);

    /* ================= DEBOUNCED SAVE ================= */
    const debouncedSave = useRef(
        debounce(async (note: Note,) => {
            try {
                await updateNote({
                    id: Number(noteId),
                    title: note.title,
                    content: note.content,
                });
            } catch {
                toast.error("Auto-save failed");
            }
        }, 500)
    ).current;

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (field: "title" | "content", value: string) => {
        setNoteData((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, [field]: value };
            debouncedSave(updated);
            return updated;
        });
    };

    /* ================= UI ================= */
    if (loading) return <NoteEditorSkeleton />;
    if (!noteData) return <p className="text-center">Note not found</p>;

    return (
        <div className="relative w-full h-full shadow-input p-10">
            {/* Connected users */}
            <div className="max-w-2xl mx-auto flex justify-end gap-1 mb-3">
                {connectedUsers.map((u) => (
                    <Avatar key={u.id} username={u.name} />
                ))}
            </div>

            {/* Editor */}
            <form className="max-w-2xl mx-auto">
                <Group>
                    <Input
                        value={noteData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </Group>

                <Group>
                    <Textarea
                        rows={10}
                        value={noteData.content}
                        onChange={(e) => handleChange("content", e.target.value)}
                    />
                </Group>
            </form>
        </div>
    );
};

export default SharedNoteById;

/* ================= AVATAR ================= */
const Avatar = ({ username }: { username: string }) => (
    <div className="size-8 bg-pink-300 rounded-full flex items-center justify-center border-4 border-gray-200">
        {username[0]}
    </div>
);

/* ================= SKELETON ================= */
const NoteEditorSkeleton = () => (
    <div className="w-full h-full p-10 animate-pulse">
        <div className="max-w-2xl mx-auto flex justify-end mb-6">
            <div className="size-10 rounded-full bg-neutral-300" />
        </div>
        <div className="max-w-2xl mx-auto mb-4">
            <div className="h-10 w-full rounded bg-neutral-300" />
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-neutral-200 rounded" />
            ))}
        </div>
    </div>
);
