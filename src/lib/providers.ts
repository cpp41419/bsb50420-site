import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// Audit scores from automated site analysis
export interface AuditScores {
  intent_fulfillment: number | null
  ux_engineering: number | null
  regulatory_bedrock: number | null
  performance_stability: number | null
  accessibility: number | null
  commercial_integrity: number | null
  institutional_authority: number | null
  audit_date: string | null
}

// Provider type matching Dossier Comparison Engine
export interface ComparisonProvider {
  id: string
  name: string
  rto_code: string | null
  type: "Private" | "TAFE" | "Industry" | "University"
  state: string
  website: string | null
  phone: string | null
  email: string | null
  price: number | null
  price_max: number | null
  duration_weeks: number | null
  delivery_modes: string[]
  rating: number | null
  review_count: number
  completion_rate: number | null
  mdpa_score: number
  status: "active" | "inactive"
  audit_scores?: AuditScores
}

// Calculate MDPA score from provider metrics
function calculateMDPAScore(provider: {
  rating: number | null
  completion_rate: number | null
  review_count: number
}): number {
  let score = 50 // Base score

  // Rating component (max 25 points)
  if (provider.rating) {
    score += (provider.rating / 5) * 25
  }

  // Completion rate component (max 15 points)
  if (provider.completion_rate) {
    score += (provider.completion_rate / 100) * 15
  }

  // Review volume component (max 10 points)
  const reviewScore = Math.min(provider.review_count / 100, 1) * 10
  score += reviewScore

  return Math.round(score)
}

// Fetch all providers with courses and locations
export async function getProviders(): Promise<ComparisonProvider[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("rto_providers")
    .select(`
      id,
      name,
      rto_code,
      type,
      rating,
      review_count,
      completion_rate,
      website,
      phone,
      email,
      is_active,
      rto_courses (
        price_min,
        price_max,
        duration_weeks,
        delivery_modes
      ),
      rto_locations (
        state_code,
        city,
        is_primary_location
      )
    `)
    .eq("is_active", true)
    .order("rating", { ascending: false, nullsFirst: false })

  if (error) {
    console.error("Error fetching providers:", error)
    return []
  }

  return (data || []).map((p: any) => {
    const course = p.rto_courses?.[0]
    const location = p.rto_locations?.find((l: any) => l.is_primary_location) || p.rto_locations?.[0]

    // Parse delivery modes
    let deliveryModes: string[] = []
    if (course?.delivery_modes) {
      if (typeof course.delivery_modes === "string") {
        try {
          deliveryModes = JSON.parse(course.delivery_modes)
        } catch {
          deliveryModes = [course.delivery_modes]
        }
      } else if (Array.isArray(course.delivery_modes)) {
        deliveryModes = course.delivery_modes
      }
    }

    // Price is stored in cents, convert to dollars
    const priceMin = course?.price_min ? Math.round(course.price_min / 100) : null
    const priceMax = course?.price_max ? Math.round(course.price_max / 100) : null

    return {
      id: p.id,
      name: p.name,
      rto_code: p.rto_code,
      type: p.type,
      state: location?.state_code || "National",
      website: p.website,
      phone: p.phone,
      email: p.email,
      price: priceMin,
      price_max: priceMax,
      duration_weeks: course?.duration_weeks,
      delivery_modes: deliveryModes,
      rating: p.rating ? parseFloat(p.rating) : null,
      review_count: p.review_count || 0,
      completion_rate: p.completion_rate,
      mdpa_score: calculateMDPAScore({
        rating: p.rating ? parseFloat(p.rating) : null,
        completion_rate: p.completion_rate,
        review_count: p.review_count || 0,
      }),
      status: p.is_active ? "active" : "inactive",
    }
  })
}

// Fetch providers by state
export async function getProvidersByState(stateCode: string): Promise<ComparisonProvider[]> {
  const allProviders = await getProviders()

  return allProviders.filter(
    (p) => p.state === stateCode || p.state === "National" || p.state === "Multi"
  )
}

// Get market statistics
export async function getMarketStats(providers: ComparisonProvider[]) {
  const prices = providers.map((p) => p.price).filter((p): p is number => p !== null)
  const scores = providers.map((p) => p.mdpa_score)

  const sortedPrices = [...prices].sort((a, b) => a - b)

  return {
    providerCount: providers.length,
    medianPrice: sortedPrices.length > 0 ? sortedPrices[Math.floor(sortedPrices.length / 2)] : 0,
    minPrice: sortedPrices.length > 0 ? sortedPrices[0] : 0,
    maxPrice: sortedPrices.length > 0 ? sortedPrices[sortedPrices.length - 1] : 0,
    avgScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
  }
}

// Fetch single provider by ID
export async function getProviderById(id: string): Promise<ComparisonProvider | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("rto_providers")
    .select(`
      id,
      name,
      rto_code,
      type,
      rating,
      review_count,
      completion_rate,
      website,
      phone,
      email,
      is_active,
      created_at,
      score_intent_fulfillment,
      score_ux_engineering,
      score_regulatory_bedrock,
      score_performance_stability,
      score_accessibility,
      score_commercial_integrity,
      score_institutional_authority,
      audit_date,
      rto_courses (
        course_code,
        price_min,
        price_max,
        duration_weeks,
        delivery_modes
      ),
      rto_locations (
        state_code,
        city,
        postcode,
        is_primary_location
      )
    `)
    .eq("id", id)
    .single()

  if (error || !data) {
    console.error("Error fetching provider:", error)
    return null
  }

  const p = data as any
  const course = p.rto_courses?.[0]
  const location = p.rto_locations?.find((l: any) => l.is_primary_location) || p.rto_locations?.[0]

  let deliveryModes: string[] = []
  if (course?.delivery_modes) {
    if (typeof course.delivery_modes === "string") {
      try {
        deliveryModes = JSON.parse(course.delivery_modes)
      } catch {
        deliveryModes = [course.delivery_modes]
      }
    } else if (Array.isArray(course.delivery_modes)) {
      deliveryModes = course.delivery_modes
    }
  }

  const priceMin = course?.price_min ? Math.round(course.price_min / 100) : null
  const priceMax = course?.price_max ? Math.round(course.price_max / 100) : null

  return {
    id: p.id,
    name: p.name,
    rto_code: p.rto_code,
    type: p.type,
    state: location?.state_code || "National",
    website: p.website,
    phone: p.phone,
    email: p.email,
    price: priceMin,
    price_max: priceMax,
    duration_weeks: course?.duration_weeks,
    delivery_modes: deliveryModes,
    rating: p.rating ? parseFloat(p.rating) : null,
    review_count: p.review_count || 0,
    completion_rate: p.completion_rate,
    mdpa_score: calculateMDPAScore({
      rating: p.rating ? parseFloat(p.rating) : null,
      completion_rate: p.completion_rate,
      review_count: p.review_count || 0,
    }),
    status: p.is_active ? "active" : "inactive",
    audit_scores: {
      intent_fulfillment: p.score_intent_fulfillment,
      ux_engineering: p.score_ux_engineering,
      regulatory_bedrock: p.score_regulatory_bedrock,
      performance_stability: p.score_performance_stability,
      accessibility: p.score_accessibility,
      commercial_integrity: p.score_commercial_integrity,
      institutional_authority: p.score_institutional_authority,
      audit_date: p.audit_date,
    },
  }
}

// Submit RTO owner claim/contact
export async function submitOwnerClaim(data: {
  provider_id: string
  name: string
  email: string
  phone?: string
  role: string
  message?: string
}) {
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("owner_claims").insert({
    rto_id: data.provider_id,
    contact_name: data.name,
    contact_email: data.email,
    contact_phone: data.phone,
    role_at_rto: data.role,
    message: data.message,
    status: "pending",
  })

  if (error) {
    console.error("Error submitting owner claim:", error)
    throw error
  }

  return { success: true }
}

// Submit enquiry
export async function submitEnquiry(data: {
  provider_id: string
  name: string
  email: string
  phone?: string
  message?: string
  state: string
}) {
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("enquiries").insert({
    rto_id: data.provider_id,
    student_name: data.name,
    student_email: data.email,
    student_phone: data.phone,
    message: data.message,
    state_preference: data.state,
    source: "comparison-engine",
  })

  if (error) {
    console.error("Error submitting enquiry:", error)
    throw error
  }

  return { success: true }
}
