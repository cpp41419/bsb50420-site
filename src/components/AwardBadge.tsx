import Image from "next/image"
import { cn } from "@/lib/utils"

interface AwardBadgeProps {
    type: 'regulatory' | 'quality' | 'value';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function AwardBadge({ type, className, size = 'md' }: AwardBadgeProps) {
    const images = {
        regulatory: '/badge-regulatory.png',
        quality: '/badge-regulatory.png', // Fallback for now
        value: '/badge-regulatory.png',     // Fallback for now
    }

    const sizes = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-40 h-40',
    }

    const labels = {
        regulatory: 'Regulatory Excellence',
        quality: 'Quality Certified',
        value: 'Best Value Index',
    }

    return (
        <div className={cn("relative group flex flex-col items-center", className)}>
            <div className={cn("relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", sizes[size])}>
                <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                    src={images[type]}
                    alt={labels[type]}
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>
            {(size === 'md' || size === 'lg') && (
                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors text-center max-w-[120px]">
                    {labels[type]}
                </span>
            )}
        </div>
    )
}
