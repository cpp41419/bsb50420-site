import { SITE } from "@/site";
import { IntentHome } from "@/components/home/IntentHome";
import { RegistryHome } from "@/components/home/RegistryHome";
import { DataLoader } from "@/lib/DataLoader";

export default function Home() {
  const faqs = DataLoader.loadData("faq.json");
  const qualification = DataLoader.loadQualification();
  const research = DataLoader.loadData("research.json");
  const faqsArray = Array.isArray(faqs) ? faqs : [];

  if (!qualification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-mono text-sm">Loading Regulatory Spine...</p>
        </div>
      </div>
    );
  }

  if (SITE.mode === "registry") {
    const units = DataLoader.loadData("units.json");
    const unitsArray = Array.isArray(units) ? units : [];
    return <RegistryHome faqs={faqsArray} units={unitsArray} />;
  }

  return <IntentHome faqs={faqsArray} qualification={qualification} research={research} />;
}
