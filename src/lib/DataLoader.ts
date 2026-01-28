import fs from 'fs';
import path from 'path';
import { QualificationJSON } from "@/types/data";
import { parseQualification, parseFAQData } from "./schemas";

// Types
export interface City {
    name: string;
    slug: string;
    [key: string]: any;
}

export interface Provider {
    name: string;
    [key: string]: any;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

const getSiteKey = () => {
    // In production, this might come from env, but for local dev & build we use the one set in env
    const key = process.env.NEXT_PUBLIC_SITE_KEY;
    if (!key) throw new Error("NEXT_PUBLIC_SITE_KEY is not set");
    return key;
};

export const DataLoader = {
    /**
     * Load a JSON file from the data/ folder
     */
    loadData: <T>(filename: string): T => {
        const siteKey = getSiteKey();
        const filePath = path.join(CONTENT_DIR, siteKey, 'data', filename);

        if (!fs.existsSync(filePath)) {
            console.warn(`DataLoader: File not found ${filePath}`);
            return {} as T;
        }

        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContents);
        } catch (error) {
            console.error(`DataLoader: Failed to parse ${filePath}:`, error);
            return {} as T;
        }
    },

    /**
     * Load qualification.json with schema validation
     * Throws on validation failure - no silent fallbacks
     */
    loadQualification: (): QualificationJSON => {
        const raw = DataLoader.loadData<unknown>('qualification.json');
        if (!raw || Object.keys(raw).length === 0) {
            throw new Error('DataLoader: qualification.json is empty or missing');
        }
        const validated = parseQualification(raw);
        if (!validated) {
            console.error('DataLoader: qualification.json failed validation', JSON.stringify(raw, null, 2).slice(0, 500));
            throw new Error('DataLoader: qualification.json failed schema validation - fix the data before proceeding');
        }
        return validated as QualificationJSON;
    },

    /**
     * Load faq.json with schema validation
     * Throws on validation failure - no silent fallbacks
     */
    loadFAQ: () => {
        const raw = DataLoader.loadData<unknown>('faq.json');
        if (!raw || Object.keys(raw).length === 0) {
            throw new Error('DataLoader: faq.json is empty or missing');
        }
        const validated = parseFAQData(raw);
        if (!validated) {
            console.error('DataLoader: faq.json failed validation', JSON.stringify(raw, null, 2).slice(0, 500));
            throw new Error('DataLoader: faq.json failed schema validation - fix the data before proceeding');
        }
        return validated;
    },

    /**
     * Load a City definition from locations/ folder
     */
    loadCity: (slug: string): City | null => {
        const siteKey = getSiteKey();
        const filePath = path.join(CONTENT_DIR, siteKey, 'locations', `${slug}.json`);

        if (!fs.existsSync(filePath)) return null;

        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents) as City;
    },

    /**
     * Load all cities
     */
    getAllCities: (): City[] => {
        const siteKey = getSiteKey();
        const locationsDir = path.join(CONTENT_DIR, siteKey, 'locations');

        if (!fs.existsSync(locationsDir)) return [];

        const files = fs.readdirSync(locationsDir).filter(f => f.endsWith('.json'));
        return files.map(file => {
            const content = fs.readFileSync(path.join(locationsDir, file), 'utf8');
            return JSON.parse(content) as City;
        });
    },

    /**
     * Load a Blog Post (MDX content)
     */
    loadPost: (slug: string) => {
        const siteKey = getSiteKey();
        const filePath = path.join(CONTENT_DIR, siteKey, 'posts', `${slug}.mdx`);

        if (!fs.existsSync(filePath)) return null;

        return fs.readFileSync(filePath, 'utf8');
    },

    /**
     * Get all blog post slugs for generateStaticParams
     */
    getAllPostSlugs: (): string[] => {
        const siteKey = getSiteKey();
        const postsDir = path.join(CONTENT_DIR, siteKey, 'posts');

        if (!fs.existsSync(postsDir)) return [];

        return fs.readdirSync(postsDir)
            .filter(f => f.endsWith('.mdx'))
            .map(f => f.replace('.mdx', ''));
    }
};
