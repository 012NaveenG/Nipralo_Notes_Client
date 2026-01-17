import { useParams } from "react-router-dom";
import { Group } from "../../components/ui/Group.tsx";
import { Input } from "../../components/ui/Input.tsx";
import Textarea from "../../components/ui/Textarea.tsx";
import { useEffect, useState, type FormEvent } from "react";
import { addCollaborator, fetchNoteByNoteId } from "../../api/note.api.ts";
import type { CollaboratorForm, Note } from "../../types/note.types.ts";
import toast from "react-hot-toast";
import { connectSocket } from "../../socketio.ts";
import Button from "../../components/ui/Button.tsx";
import Loader from "../../components/ui/Loader.tsx";
import { Label } from "../../components/ui/Label.tsx";
import FormHeader from "../../components/ui/FormHeader.tsx";
import FormTitle from "../../components/ui/FormTitle.tsx";

const SharedNoteById = () => {
    const { noteId } = useParams<{ noteId: string }>();
    const [noteData, setNoteData] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        if (!noteId) return;
        connectSocket()

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
        <div className="relative w-full h-full shadow-input p-10">
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

            <AddColaboratorFormModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                noteId={Number(noteId)}
            />

        </div>
    );
};

export default SharedNoteById;


const Avatar = () => {
    return (
        <div className="size-8 bg-pink-300 rounded-full p-2 flex items-center justify-center border-4 border-gray-200">
            N
        </div>
    )
}


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
