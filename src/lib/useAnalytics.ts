import { supabase } from '@/lib/supabase';

export function useAnalytics() {
    const track = async (event: string, data?: object) => {
        try {
            if (!supabase) {
                console.warn('Analytics skipped: Supabase not initialized');
                return;
            }

            const payload = {
                site_id: process.env.NEXT_PUBLIC_SITE_ID || 'unknown-site',
                event_name: event,
                event_data: {
                    path: typeof window !== 'undefined' ? window.location.pathname : '',
                    referrer: typeof document !== 'undefined' ? document.referrer : '',
                    timestamp: new Date().toISOString(),
                    ...data
                }
            };

            // Fire and forget (don't await to block UI)
            supabase.from('analytics_events').insert(payload).then(({ error }: { error: any }) => {
                if (error) {
                    console.warn('Analytics Error:', error);
                }
            });

        } catch (err) {
            console.warn('Analytics Exception:', err);
        }
    };

    return { track };
}
