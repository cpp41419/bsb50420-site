import { getAllTags } from "@/lib/questions"
import Link from "next/link"

export function TagTicker() {
    const tags = getAllTags().slice(0, 20) // Top 20 tags

    return (
        <div className="w-full overflow-hidden bg-muted/20 border-y py-4">
            <div className="flex w-max animate-scroll">
                {/* Original Set */}
                <div className="flex items-center gap-4 px-4">
                    {tags.map((tag) => (
                        <Link
                            key={tag.slug}
                            href={`/questions/${tag.slug}`}
                            className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-[10px] font-black hover:bg-muted hover:text-primary transition-all whitespace-nowrap uppercase tracking-widest gap-2"
                        >
                            <span className="text-secondary opacity-50">NODE</span>
                            {tag.name} COURSE
                        </Link>
                    ))}
                </div>
                {/* Duplicate Set for Seamless Loop */}
                <div className="flex items-center gap-4 px-4" aria-hidden="true">
                    {tags.map((tag) => (
                        <Link
                            key={`${tag.slug}-dup`}
                            href={`/questions/${tag.slug}`}
                            className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-[10px] font-black hover:bg-muted hover:text-primary transition-all whitespace-nowrap uppercase tracking-widest gap-2"
                        >
                            <span className="text-secondary opacity-50">NODE</span>
                            {tag.name} COURSE
                        </Link>
                    ))}
                </div>
                {/* Triplicate Set for Wide Screens */}
                <div className="flex items-center gap-4 px-4" aria-hidden="true">
                    {tags.map((tag) => (
                        <Link
                            key={`${tag.slug}-dup2`}
                            href={`/questions/${tag.slug}`}
                            className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-[10px] font-black hover:bg-muted hover:text-primary transition-all whitespace-nowrap uppercase tracking-widest gap-2"
                        >
                            <span className="text-secondary opacity-50">NODE</span>
                            {tag.name} COURSE
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
