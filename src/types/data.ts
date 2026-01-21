export interface QualificationJSON {
    qualification: {
        code: string;
        name: string;
        training_package: string;
        status: string;
        regulator: string;
    };
    metadata?: {
        title?: string;
        description?: string;
        courseCode?: string;
        vertical?: string;
        primaryColor?: string;
        lastHealed?: string;
    };
    site_identity?: {
        role: string;
        scope: string;
        positioning: string;
    };
    courseInfo?: {
        overview: string;
        personas: Array<{
            title: string;
            description: string;
        }>;
        entryRequirements: string[];
        duration: string;
        studyModes: string;
        costs: {
            average: string;
            range: string;
            funding: string[];
        };
        outcomes: string[];
        checklist: string[];
        riskRadar?: {
            title: string;
            items: Array<{
                title: string;
                description: string;
                riskLevel: 'high' | 'medium' | 'low';
            }>;
        };
    };
    units?: Array<{
        code: string;
        title: string;
        type: string;
        description: string;
        evidence: string;
    }>;
    [key: string]: any;
}

export interface ResearchJSON {
    courseCode: string;
    lastGenerated: string;
    pricing: {
        min: number | null;
        max: number | null;
        average: number | null;
        median: number | null;
        currency: string;
    };
    duration: {
        min: number | null;
        max: number | null;
        unit: string;
    };
    salary: {
        entry: number | null;
        median: number | null;
        top: number | null;
    };
}
