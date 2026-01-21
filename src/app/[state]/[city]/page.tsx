import React from 'react';
import { DataLoader } from '@/lib/DataLoader';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{
    state: string;
    city: string;
  }>;
};

export async function generateStaticParams() {
  const cities = DataLoader.getAllCities();
  return cities
    .filter((city) => city && city.slug)
    .map((city) => ({
      state: (city.state || 'nsw').toLowerCase(),
      city: city.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
  const { city, state } = await params;
  const cityData = DataLoader.loadCity(city);

  if (!cityData) {
    return {
      title: 'City Not Found'
    }
  }

  return {
    title: `${cityData.name} Course Guide`,
    description: `Everything you need to know about studying in ${cityData.name}, ${state.toUpperCase()}.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city, state } = await params;
  const cityData = DataLoader.loadCity(city);

  if (!cityData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <nav className="flex items-center text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/states" className="hover:text-blue-600">States</Link>
          <span className="mx-2">/</span>
          <span className="uppercase">{state}</span>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">{cityData.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{cityData.name}</h1>
            <p className="text-slate-300 text-xl max-w-2xl">{cityData.heroSubtitle || `The ultimate guide to studying in ${cityData.name}.`}</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose max-w-none text-slate-600">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About {cityData.name}</h2>
              <p>{cityData.description || "City description coming soon..."}</p>
            </div>

            {/* Placeholder for city specific stats or provider lists */}
            <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Local Opportunities</h3>
              <p className="text-slate-600">Find providers in {cityData.name}...</p>
            </div>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              "name": cityData.name,
              "description": cityData.description,
              "address": {
                "@type": "PostalAddress",
                "addressRegion": state.toUpperCase(),
                "addressCountry": "AU"
              }
            })
          }}
        />
      </div>
    </main>
  );
}
