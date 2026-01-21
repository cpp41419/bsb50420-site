import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Award, TrendingUp, BookOpen, Shield } from "lucide-react";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: `About ${SITE.course.code} ${SITE.course.name}`,
  description: `Learn about ${SITE.course.code} qualification, career pathways, industry outlook, and what you'll study in this nationally recognized certification.`
};

export default function AboutPage() {
  const courseCode = SITE.course.code;
  const courseName = SITE.course.name;

  const careerPaths = [
    { title: "Entry Level", salary: "$55,000 - $70,000", icon: Building2 },
    { title: "Mid-Level Professional", salary: "$70,000 - $90,000", icon: Users },
    { title: "Senior Professional", salary: "$90,000 - $120,000", icon: Award },
    { title: "Management", salary: "$100,000 - $150,000+", icon: TrendingUp }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About {courseCode} {courseName}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Your pathway to a rewarding career with a nationally recognized qualification
          in Australia.
        </p>
      </div>

      {/* What is this course */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">What is {courseCode}?</h2>
                <p className="text-muted-foreground mb-4">
                  {courseCode} {courseName} is a nationally recognized qualification
                  that prepares you for a professional career in this field. This course
                  provides comprehensive training in the knowledge and skills required
                  to work effectively in the industry.
                </p>
                <p className="text-muted-foreground mb-4">
                  This qualification is recognized across all Australian states and territories,
                  though specific licensing requirements may vary by jurisdiction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Career Pathways */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Career Pathways & Salaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerPaths.map((career, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <career.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{career.title}</h3>
                <p className="text-sm text-muted-foreground">{career.salary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Salary ranges are indicative and vary by location, experience, and employer.
        </p>
      </section>

      {/* Industry Outlook */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <TrendingUp className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Industry Outlook</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The industry is experiencing strong growth driven by several factors:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Growing demand across Australia</li>
                    <li>Increasing regulatory complexity and compliance requirements</li>
                    <li>Rising consumer expectations for professional services</li>
                    <li>Expanding career opportunities in major cities</li>
                  </ul>
                  <p>
                    Industry bodies report steady demand for qualified professionals,
                    with many employers actively seeking {courseCode} graduates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Licensing Requirements */}
      <section>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Licensing Requirements</h2>
                <p className="text-muted-foreground mb-4">
                  After completing {courseCode}, you may need to obtain state-specific licensing:
                </p>
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <strong className="text-foreground">NSW:</strong> {SITE.regulators?.nsw || "NSW Fair Trading"}
                  </div>
                  <div>
                    <strong className="text-foreground">Victoria:</strong> {SITE.regulators?.vic || "Consumer Affairs Victoria"}
                  </div>
                  <div>
                    <strong className="text-foreground">Queensland:</strong> Office of Fair Trading (OFT)
                  </div>
                  <div>
                    <strong className="text-foreground">WA:</strong> Department of Commerce
                  </div>
                  <div>
                    <strong className="text-foreground">SA, TAS, NT, ACT:</strong> State-specific registration requirements
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  Visit our <a href="/states" className="text-primary hover:underline">State Licensing Guides</a> for
                  detailed requirements, application processes, and ongoing CPD obligations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
