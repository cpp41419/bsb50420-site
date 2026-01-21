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
                            href={`/tag/${tag.slug}`}
                            className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium hover:bg-muted hover:text-primary transition-colors whitespace-nowrap"
                        >
                            <span className="text-secondary mr-1.5">#</span>
                            {tag.name}
                        </Link>
                    ))}
                </div>
                {/* Duplicate Set for Seamless Loop */}
                <div className="flex items-center gap-4 px-4" aria-hidden="true">
                    {tags.map((tag) => (
                        <Link
                            key={`${tag.slug}-dup`}
                            href={`/tag/${tag.slug}`}
                            className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium hover:bg-muted hover:text-primary transition-colors whitespace-nowrap"
                        >
                            <span className="text-secondary mr-1.5">#</span>
                            {tag.name}
                        </Link>
                    ))}
                </div>
                {/* Triplicate Set for Wide Screens */}
                <div className="flex items-center gap-4 px-4" aria-hidden="true">
                    {tags.map((tag) => (
                        <Link
                            key={`${tag.slug}-dup2`}
                            href={`/tag/${tag.slug}`}
                            className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium hover:bg-muted hover:text-primary transition-colors whitespace-nowrap"
                        >
                            <span className="text-secondary mr-1.5">#</span>
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
