import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export interface Qualification {
  id: string
  code: string
  name: string
  level: string | null
  industry: string | null
  training_package: string | null
  supersedes: string | null
  superseded_by: string | null
  is_active: boolean
  provider_count: number
}

export interface CourseProvider {
  id: string
  name: string
  rto_code: string | null
  type: string
  state: string
  rating: number | null
  review_count: number
  price_min: number | null
  price_max: number | null
  duration_weeks: number | null
  delivery_modes: string[]
  website: string | null
}

// Fetch all qualifications
export async function getQualifications(): Promise<Qualification[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("qualifications")
    .select("*")
    .eq("is_active", true)
    .order("provider_count", { ascending: false })

  if (error) {
    console.error("Error fetching qualifications:", error)
    return []
  }

  return data || []
}

// Fetch single qualification by code
export async function getQualificationByCode(code: string): Promise<Qualification | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("qualifications")
    .select("*")
    .eq("code", code.toUpperCase())
    .single()

  if (error || !data) {
    return null
  }

  return data
}

// Fetch all providers for a qualification
export async function getProvidersByQualification(code: string): Promise<CourseProvider[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("rto_courses")
    .select(`
      price_min,
      price_max,
      duration_weeks,
      delivery_modes,
      rto_providers!inner (
        id,
        name,
        rto_code,
        type,
        rating,
        review_count,
        website,
        is_active,
        rto_locations (
          state_code,
          is_primary_location
        )
      )
    `)
    .eq("course_code", code.toUpperCase())
    .eq("is_available", true)
    .eq("rto_providers.is_active", true)

  if (error) {
    console.error("Error fetching providers for qualification:", error)
    return []
  }

  return (data || []).map((c: any) => {
    const p = c.rto_providers
    const location = p.rto_locations?.find((l: any) => l.is_primary_location) || p.rto_locations?.[0]

    let deliveryModes: string[] = []
    if (c.delivery_modes) {
      if (typeof c.delivery_modes === "string") {
        try {
          deliveryModes = JSON.parse(c.delivery_modes)
        } catch {
          deliveryModes = [c.delivery_modes]
        }
      } else if (Array.isArray(c.delivery_modes)) {
        deliveryModes = c.delivery_modes
      }
    }

    return {
      id: p.id,
      name: p.name,
      rto_code: p.rto_code,
      type: p.type,
      state: location?.state_code || "National",
      rating: p.rating ? parseFloat(p.rating) : null,
      review_count: p.review_count || 0,
      price_min: c.price_min ? Math.round(c.price_min / 100) : null,
      price_max: c.price_max ? Math.round(c.price_max / 100) : null,
      duration_weeks: c.duration_weeks,
      delivery_modes: deliveryModes,
      website: p.website,
    }
  })
}

// Group qualifications by industry
export function groupByIndustry(qualifications: Qualification[]): Record<string, Qualification[]> {
  return qualifications.reduce((acc, q) => {
    const industry = q.industry || "Other"
    if (!acc[industry]) acc[industry] = []
    acc[industry].push(q)
    return acc
  }, {} as Record<string, Qualification[]>)
}

// Get qualification level badge color
export function getLevelColor(level: string | null): string {
  switch (level) {
    case "Certificate II":
      return "bg-muted-foreground"
    case "Certificate III":
      return "bg-primary/80"
    case "Certificate IV":
      return "bg-emerald-500"
    case "Diploma":
      return "bg-purple-500"
    case "Advanced Diploma":
      return "bg-amber-500"
    case "Graduate Certificate":
    case "Graduate Diploma":
      return "bg-rose-500"
    default:
      return "bg-muted-foreground/60"
  }
}
