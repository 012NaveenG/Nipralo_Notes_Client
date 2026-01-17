
import { useEffect, useState, type FormEvent } from "react"
import Button from "../../components/ui/Button.tsx"
import FormHeader from "../../components/ui/FormHeader.tsx"
import FormTitle from "../../components/ui/FormTitle.tsx"
import { Group } from "../../components/ui/Group.tsx"
import { Input } from "../../components/ui/Input.tsx"
import { Label } from "../../components/ui/Label.tsx"
import { cn } from "../../lib/utils.ts"
import { Link } from "react-router-dom"
import type { Note } from "../../types/note.types.ts"
import { createNote, deleteNote, fetchNoteByUserId } from "../../api/note.api.ts"
import toast from "react-hot-toast"
import Loader from "../../components/ui/Loader.tsx"
import { Trash2 } from "lucide-react"
import type { AxiosError } from "axios"

interface NoteForm {
    title: string;
    content: string
}


const Index = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true)
                const data = await fetchNoteByUserId();
                setNotes(data);
                setLoading(false)
            } catch (error: any) {
                console.error(error.message);
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        };

        loadNotes();
    }, [setOpenModal]);

    const handleDelete = async (id?: number) => {
        if (typeof id !== "number") return;
        try {

            const res = await deleteNote(id)
            setNotes((prev) => prev.filter((item) => item.id !== id))
            toast.success(res)
        } catch (error) {
            const err = error as AxiosError<any>
            toast.error(err.response?.data?.message || "Delete Note failed")
        }
    }

    return (
        <div className={`p-4 w-full  relative `}>
            <div className="  flex items-center justify-end pr-20">
                <Button
                    onClick={() => setOpenModal((prev) => !prev)}

                >
                    Create Note
                </Button>
            </div>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <NoteCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {notes.length > 0 ? notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            className="relative group">
                            <Title>{note.title}</Title>
                            <Description className="h-20 overflow-y-hidden">{note.content}</Description>

                            <div className="flex items-center justify-end gap-2">
                                <Link
                                    to={`/app/note/${note.id}`}
                                    className="flex items-center justify-center bg-gray-50 opacity-80  transition-all duration-300 ease-linear font-semibold border rounded-full px-2 py-1 text-xs hover:bg-neutral-400 hover:text-primary"
                                >
                                    View
                                </Link>

                                <Button
                                    onClick={() => handleDelete(note.id)}
                                    className="size-8 float-end bg-red-600 flex items-center justify-center hover:bg-red-700 text-xs p-1"
                                >
                                    <Trash2 size={15} />
                                </Button>
                            </div>
                        </NoteCard>
                    )) : <p className="text center font-semibold">No Note Found</p>}

                </div>
            )}

            <NoteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    )
}

export default Index

const NoteCard = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div className={cn(
            'h-42 w-56 rounded-lg shadow-input px-2 py-4 bg-gray-50 overflow-hidden',
            className
        )}>
            {children}
        </div>
    )
}

const Title = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <h2 className={cn('text-neutral-700 text-lg', className)}>{children}</h2>
    )
}
const Description = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <p className={cn('text-neutral-500 text-xs', className)}>{children}</p>
    )
}
const NoteCardSkeleton = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "w-56 rounded-lg shadow-input px-2 py-4 bg-gray-50",
                "animate-pulse",
                className
            )}
        >
            {/* Title */}
            <div className="h-4 w-3/4 bg-neutral-300 rounded mb-3" />

            {/* Content preview */}
            <div className="space-y-2">
                <div className="h-3 w-full bg-neutral-200 rounded" />
                <div className="h-3 w-11/12 bg-neutral-200 rounded" />
                <div className="h-3 w-5/6 bg-neutral-200 rounded" />
            </div>


        </div>
    );
};


const NoteModal = ({ openModal, setOpenModal }: {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {


    if (!openModal) return null
    const [form, setForm] = useState<NoteForm>({
        title: "",
        content: ""
    })
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await createNote(form); // ✅ await
            toast.success(response);
            setLoading(false)
            setOpenModal((prev) => !prev)
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to create note");
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
                    <FormTitle className="text-center">Create a New Note</FormTitle>
                </FormHeader>
                <Group>
                    <Label
                        htmlFor="title"
                    >Title</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="what's in your mind?"
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                </Group>
                <Group>
                    <Label
                        htmlFor="content"
                    >Content</Label>
                    <textarea
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        name="content"
                        id="content"
                        placeholder="describe your note"
                        className={cn(
                            'outline-none rounded px-4 py-2 shadow-input border border-primary',
                            'focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:border-none',
                            'placeholder:text-neutral-400  placeholder:tracking-tight',
                            'transition-all duration-200 ease-linear  ')}
                    ></textarea>
                </Group>

                <div className="flex items-center justify-end gap-2">
                    {loading ? <Loader /> : <Button>Add Note</Button>}
                    <Button
                        type="reset"
                        className="bg-red-500"
                        onClick={() => setOpenModal((prev) => !prev)}
                    >Close</Button>
                </div>
            </form>
        </div>
    )
}