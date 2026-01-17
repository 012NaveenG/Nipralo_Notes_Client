import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"
import type { Note } from "../../types/note.types.ts";
import { cn } from "../../lib/utils";
import { fetchSharedNotes } from "../../api/note.api.ts";

const SharedNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true)
                const data = await fetchSharedNotes();
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
    }, []);

    return (
        <div className={`p-4 w-full  relative `}>

            {loading ? (
                <div className="grid grid-cols-3 gap-5 mt-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <NoteCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-5 mt-10">
                    {notes.length > 0 ? notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            className="relative group">
                            <Title>{note.title}</Title>
                            <Description>{note.content}</Description>

                            <Link
                                to={`/app/shared-note/${note.id}`}
                                className="hidden  absolute group-hover:flex items-center justify-center bg-gray-50 opacity-80  h-full w-full top-0 left-0 transition-all duration-300 ease-linear font-semibold"
                            >
                                View
                            </Link>
                        </NoteCard>
                    )) : <p className="text center font-semibold">No Note Found</p>}

                </div>
            )}


        </div>
    )
}


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


export default SharedNotes