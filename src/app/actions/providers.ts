"use server"

import { getProviders, getProviderById, getMarketStats, submitEnquiry, submitOwnerClaim, type ComparisonProvider } from "@/lib/providers"

export async function fetchProviders(): Promise<ComparisonProvider[]> {
  return await getProviders()
}

export async function fetchProviderById(id: string): Promise<ComparisonProvider | null> {
  return await getProviderById(id)
}

export async function fetchMarketStats(providers: ComparisonProvider[]) {
  return await getMarketStats(providers)
}

export async function submitProviderEnquiry(data: {
  provider_id: string
  name: string
  email: string
  phone?: string
  message?: string
  state: string
}) {
  return await submitEnquiry(data)
}

export async function submitRTOOwnerClaim(data: {
  provider_id: string
  name: string
  email: string
  phone?: string
  role: string
  message?: string
}) {
  return await submitOwnerClaim(data)
}
