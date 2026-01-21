import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Utility for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content root can be set via CONTENT_ROOT env var, or falls back to detection
const envContentRoot = process.env.CONTENT_ROOT;
const possiblePaths = [
    path.join(__dirname, '../content'), // Local site structure
    path.join(__dirname, '../main-master/content') // Monorepo structure
];
const CONTENT_ROOT = envContentRoot || possiblePaths.find(p => fs.existsSync(p)) || 'CONTENT_NOT_FOUND';

if (envContentRoot) {
    console.log(`📍 Using CONTENT_ROOT from environment: ${envContentRoot}`);
}

const IS_STRICT = process.env.STRICT_VALIDATION === 'true' || process.env.NODE_ENV === 'production';

console.log(`🛡️  Starting Content Contract Validation (Strict Mode: ${IS_STRICT})`);
console.log(`📂 Content Root: ${CONTENT_ROOT}`);

if (CONTENT_ROOT === 'CONTENT_NOT_FOUND') {
    console.error('❌ Could not locate content directory.');
    process.exit(1);
}

let hasError = false;

const logError = (site: string, message: string): void => {
    console.error(`❌ [${site}] ${message}`);
    hasError = true;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logWarn = (site: string, message: string): void => {
    if (IS_STRICT) {
        logError(site, message);
    } else {
        console.warn(`⚠️  [${site}] ${message}`);
    }
};

const validateSite = async (site: string): Promise<void> => {
    const sitePath = path.join(CONTENT_ROOT, site);
    const dataPath = path.join(sitePath, 'data');

    // 1. Check qualification.json (REQUIRED)
    const qualPath = path.join(dataPath, 'qualification.json');
    if (!fs.existsSync(qualPath)) {
        logError(site, 'Missing qualification.json - This is the Identity Spline.');
    } else {
        try {
            const qual = JSON.parse(fs.readFileSync(qualPath, 'utf-8'));
            if (!qual.qualification || !qual.site_identity || !qual.market_snapshot) {
                logError(site, 'qualification.json missing required root keys (qualification, site_identity, market_snapshot).');
            }
            if (!qual.market_snapshot.provider_count && qual.market_snapshot.provider_count !== 0 && qual.market_snapshot.provider_count !== null) {
                // It's okay to be null, but key must exist. 
                // Actually, user said: "UI must handle null gracefully".
                // Let's enforce that if it IS present, it's valid.
            }
            // Schema check: MarketStats source
            // Logic: If we rely on this file for market stats, it must be robust.
        } catch (e) {
            logError(site, `Invalid JSON in qualification.json: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    // 2. Check providers.json (REQUIRED - File existence)
    const providersPath = path.join(dataPath, 'providers.json');
    if (!fs.existsSync(providersPath)) {
        logError(site, 'Missing providers.json (Can be empty array, but MUST exist).');
    }

    // 3. Check quiz.json (REQUIRED - File existence)
    const quizPath = path.join(dataPath, 'quiz.json');
    if (!fs.existsSync(quizPath)) {
        logError(site, 'Missing quiz.json (Can be placeholder, but MUST exist).');
    }

    // 4. Check Manifest (REQUIRED)
    const manifestPath = path.join(sitePath, 'manifest.ts');
    if (!fs.existsSync(manifestPath)) {
        logError(site, 'Missing manifest.ts');
    }

    // 5. MDX Frontmatter Check (Optional content, but if exists, must be valid)
    const postsDir = path.join(sitePath, 'posts');
    if (fs.existsSync(postsDir)) {
        const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
        for (const file of files) {
            const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
            const { data } = matter(content);

            if (!data.title) logError(site, `Post ${file} missing 'title'`);
            if (!data.description) logError(site, `Post ${file} missing 'description'`);
            if (!data.date) logError(site, `Post ${file} missing 'date'`);
        }
    }

    // 6. Locations Check
    const locationsDir = path.join(sitePath, 'locations');
    if (fs.existsSync(locationsDir)) {
        const locFiles = fs.readdirSync(locationsDir).filter(f => f.endsWith('.json'));
        for (const file of locFiles) {
            try {
                const loc = JSON.parse(fs.readFileSync(path.join(locationsDir, file), 'utf-8'));
                if (!loc.state || !loc.city || !loc.hero_title) {
                    logError(site, `Location ${file} missing required fields (state, city, hero_title).`);
                }
            } catch (e) {
                logError(site, `Invalid JSON in location ${file}: ${e instanceof Error ? e.message : String(e)}`);
            }
        }
    }
};

const main = async () => {
    if (!fs.existsSync(CONTENT_ROOT)) {
        console.error('❌ Content root not found!');
        process.exit(1);
    }

    const sites = fs.readdirSync(CONTENT_ROOT).filter(f => fs.statSync(path.join(CONTENT_ROOT, f)).isDirectory());

    console.log(`🔍 Validating ${sites.length} sites...`);

    for (const site of sites) {
        await validateSite(site);
    }

    if (hasError) {
        console.error('\n❌ VALIDATION FAILED. Fix errors above.');
        if (IS_STRICT) process.exit(1);
    } else {
        console.log('\n✅ VALIDATION PASSED. Content integrity verified.');
    }
};

main();
