import type { FundingProgram } from "./types";

/**
 * NSW Smart and Skilled funding program
 * @see https://smartandskilled.nsw.gov.au
 */
export const NSW_SMART_AND_SKILLED: FundingProgram = {
    id: "nsw-smart-skilled",
    name: "Smart and Skilled",
    state: "nsw",
    description:
        "NSW Government subsidised training program providing fee-free and reduced-fee courses for eligible students.",
    studentContribution: {
        min: 0,
        max: 2400,
    },
    eligibility: {
        minAge: 15,
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "below-diploma",
        employmentStatus: ["employed", "unemployed", "seeking"],
        additionalRequirements: [
            "NSW resident or working in NSW",
            "Not enrolled in school or another government-subsidised course",
        ],
    },
    infoUrl: "https://smartandskilled.nsw.gov.au",
    isPrimary: true,
};

export const NSW_JOBTRAINER: FundingProgram = {
    id: "nsw-jobtrainer",
    name: "JobTrainer",
    state: "nsw",
    description:
        "Fee-free training for job seekers and young people aged 17-24 in priority areas.",
    studentContribution: {
        min: 0,
        max: 0,
    },
    eligibility: {
        minAge: 17,
        maxAge: 24,
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "below-cert-iv",
        employmentStatus: ["unemployed", "seeking"],
        additionalRequirements: [
            "Must be a job seeker OR aged 17-24",
            "Course must be in a priority industry area",
        ],
    },
    infoUrl: "https://smartandskilled.nsw.gov.au/jobtrainer",
};

/**
 * VIC Skills First funding program
 * @see https://www.vic.gov.au/skills-first
 */
export const VIC_SKILLS_FIRST: FundingProgram = {
    id: "vic-skills-first",
    name: "Skills First",
    state: "vic",
    description:
        "Victorian Government subsidised training delivering fee concessions for eligible students pursuing Certificate IV and above qualifications.",
    studentContribution: {
        min: 200,
        max: 1800,
    },
    eligibility: {
        minAge: 15,
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "below-diploma",
        employmentStatus: ["employed", "unemployed", "seeking"],
        additionalRequirements: [
            "Victorian resident",
            "Not enrolled in secondary school",
            "Course must be on the Skills First Funded Course List",
        ],
    },
    infoUrl: "https://www.vic.gov.au/skills-first",
    isPrimary: true,
};

export const VIC_FREE_TAFE: FundingProgram = {
    id: "vic-free-tafe",
    name: "Free TAFE",
    state: "vic",
    description: "Fee-free courses at TAFE for priority qualifications in high-demand industries.",
    studentContribution: {
        min: 0,
        max: 0,
    },
    eligibility: {
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "any",
        additionalRequirements: [
            "Course must be on the Free TAFE priority list",
            "Must enrol at a TAFE provider",
        ],
    },
    infoUrl: "https://www.vic.gov.au/free-tafe",
};

/**
 * QLD Certificate 3 Guarantee and Higher Level Skills
 * @see https://desbt.qld.gov.au/training/training-careers/subsidised
 */
export const QLD_CERT_3_GUARANTEE: FundingProgram = {
    id: "qld-cert-3-guarantee",
    name: "Certificate 3 Guarantee",
    state: "qld",
    description:
        "Queensland Government subsidised training for first Certificate III qualification.",
    studentContribution: {
        min: 0,
        max: 1500,
    },
    eligibility: {
        minAge: 15,
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "none",
        additionalRequirements: [
            "Queensland resident",
            "No existing Certificate III or higher qualification",
            "Not currently enrolled in secondary school",
        ],
    },
    infoUrl: "https://desbt.qld.gov.au/training/training-careers/subsidised/certificate3",
};

export const QLD_HIGHER_LEVEL_SKILLS: FundingProgram = {
    id: "qld-higher-level-skills",
    name: "Higher Level Skills",
    state: "qld",
    description:
        "Subsidised training for Certificate IV and above qualifications in priority areas.",
    studentContribution: {
        min: 500,
        max: 2500,
    },
    eligibility: {
        minAge: 15,
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "below-diploma",
        employmentStatus: ["employed", "unemployed", "seeking"],
        additionalRequirements: [
            "Queensland resident",
            "Course must be on the Priority Skills List",
        ],
    },
    infoUrl: "https://desbt.qld.gov.au/training/training-careers/subsidised/higherlevelskills",
    isPrimary: true,
};

export const QLD_FREE_TAFE: FundingProgram = {
    id: "qld-free-tafe",
    name: "Free TAFE",
    state: "qld",
    description: "Fee-free training at Queensland TAFE for priority qualifications.",
    studentContribution: {
        min: 0,
        max: 0,
    },
    eligibility: {
        residencyRequired: true,
        citizenshipRequired: true,
        priorQualificationLevel: "any",
        additionalRequirements: [
            "Queensland resident",
            "Course must be on Free TAFE list",
            "Must enrol through TAFE Queensland",
        ],
    },
    infoUrl: "https://tafeqld.edu.au/courses/free-tafe",
};

/**
 * Get all default funding programs
 */
export function getDefaultPrograms(): FundingProgram[] {
    return [
        NSW_SMART_AND_SKILLED,
        NSW_JOBTRAINER,
        VIC_SKILLS_FIRST,
        VIC_FREE_TAFE,
        QLD_CERT_3_GUARANTEE,
        QLD_HIGHER_LEVEL_SKILLS,
        QLD_FREE_TAFE,
    ];
}

/**
 * Get programs for a specific state
 */
export function getProgramsByState(
    state: "nsw" | "vic" | "qld",
    programs: FundingProgram[] = getDefaultPrograms()
): FundingProgram[] {
    return programs.filter((p) => p.state === state);
}
