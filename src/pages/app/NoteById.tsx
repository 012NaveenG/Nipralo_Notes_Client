import { useParams } from "react-router-dom";
import { Group } from "../../components/ui/Group.tsx";
import { Input } from "../../components/ui/Input.tsx";
import Textarea from "../../components/ui/Textarea.tsx";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { addCollaborator, fetchNoteByNoteId, updateNote } from "../../api/note.api.ts";
import type { CollaboratorForm, Note } from "../../types/note.types.ts";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Button from "../../components/ui/Button.tsx";
import Loader from "../../components/ui/Loader.tsx";
import { Label } from "../../components/ui/Label.tsx";
import FormHeader from "../../components/ui/FormHeader.tsx";
import FormTitle from "../../components/ui/FormTitle.tsx";
import { debounce } from "../../utils/debounce.ts";
import { useAuth } from "../../store/user.store.tsx";
import { useSocket } from "../../socket/useSocket.ts";

const NoteById = () => {
    const { user } = useAuth();
    const { socket, connectedUsers } = useSocket();
    const { noteId } = useParams<{ noteId: string }>();
    const [noteData, setNoteData] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState<boolean>(false)

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

    /* ================= SOCKET JOIN / LEAVE ================= */
    useEffect(() => {
        if (!socket || !noteId || !user) return;

        const join = () => {
            socket.emit("note:join", { noteId, user });
        };

        socket.connected ? join() : socket.once("connect", join);

        socket.on("note:update", (updatedNote: Note) => {
            setNoteData(updatedNote);
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
            <div className="max-w-xl sm:max-w-2xl mx-auto flex items-center justify-end gap-1">
                {connectedUsers.map((u) => (
                    <Avatar key={u.id} username={u.name} />
                ))}
                <button
                    onClick={() => setOpenModal((prev) => !prev)}
                    className="size-8 bg-neutral-200 text-primary  rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-300 active:scale-80 transition-all duration-200 ease-linear"
                >
                    <Plus />
                </button>
            </div>

            {
                loading ? <NoteEditorSkeleton />
                    : (
                        noteData ? <form className="max-w-xl sm:max-w-2xl mx-auto ">

                            <Group>
                                <Input
                                    value={noteData?.title}
                                    onChange={(e) => handleChange('title', e.target.value)}

                                />
                            </Group>
                            <Group>
                                <Textarea
                                    rows={10}
                                    value={noteData?.content}
                                    onChange={(e) => handleChange('content', e.target.value)}
                                />
                            </Group>

                        </form>
                            :
                            <div className="h-full w-full flex items-center justify-center">
                                <p>Something went wrong</p>
                            </div>
                    )
            }

            <AddColaboratorFormModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                noteId={Number(noteId)}
            />

        </div>
    );
};

export default NoteById;


const Avatar = ({ username }: { username: string }) => (
    <div className="size-8 bg-pink-300 rounded-full flex items-center justify-center border-4 border-gray-200">
        {username[0]}
    </div>
);


const AddColaboratorFormModal = ({ openModal, setOpenModal, noteId }: {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    noteId: number
}) => {


    if (!openModal) return null
    const [form, setForm] = useState<CollaboratorForm>({
        email: "",
        noteId: noteId
    })
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await addCollaborator(form);
            toast.success(response);
            setLoading(false)
            setOpenModal((prev) => !prev)
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to Add Collaborator");
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="absolute h-full top-0 bg-gray-50 flex items-center justify-center w-full z-10">
            <form
                onSubmit={handleSubmit}
                className="w-2xl mx-auto shadow-input rounded-md bg-linear-to-r from-neutral-200/50 via-neutral-300 to-neutral-400/5 py-5 px-2  transition-all duration-150 ease-linear  ">
                <FormHeader>
                    <FormTitle className="text-center">Add Collaborator </FormTitle>
                </FormHeader>
                <Group>
                    <Label
                        htmlFor="email"
                    >Collaborator Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter collaborator email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </Group>


                <div className="flex items-center justify-end gap-2">
                    {loading ? <Loader /> : <Button>Add Collaborator</Button>}
                    <Button
                        type="reset"
                        className="bg-red-500"
                        onClick={() => setOpenModal((prev) => !prev)}
                    >Cancel</Button>
                </div>
            </form>
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
