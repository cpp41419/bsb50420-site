'use client';

import { FileDown, Download } from 'lucide-react';

interface CourseGuideDownloadProps {
    courseCode: string;
    courseName: string;
    variant?: 'button' | 'card';
}

export function CourseGuideDownload({
    courseCode,
    courseName,
    variant = 'button'
}: CourseGuideDownloadProps) {
    const pdfPath = `/guides/${courseCode.toLowerCase()}-course-guide.pdf`;

    if (variant === 'card') {
        return (
            <a
                href={pdfPath}
                download={`${courseCode}-Course-Guide.pdf`}
                className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-200"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <FileDown className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            Download Course Guide
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            Complete PDF guide for {courseName}
                        </p>
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                            <Download className="w-3.5 h-3.5" />
                            {courseCode}-Course-Guide.pdf
                        </span>
                    </div>
                </div>
            </a>
        );
    }

    return (
        <a
            href={pdfPath}
            download={`${courseCode}-Course-Guide.pdf`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
        >
            <FileDown className="w-4 h-4" />
            Download Course Guide (PDF)
        </a>
    );
}
