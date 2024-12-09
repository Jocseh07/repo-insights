import { Brain, Code2, Zap, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Smart Code Analysis",
    description:
      "AI-powered breakdown of repository structure and architecture",
  },
  {
    icon: Code2,
    title: "Language Support",
    description: "Comprehensive analysis for multiple programming languages",
  },
  {
    icon: Zap,
    title: "Quick Insights",
    description: "Get instant summaries of code functionality and dependencies",
  },
  {
    icon: Network,
    title: "Interactive Exploration",
    description: "Navigate through codebases with intelligent context",
  },
];

export function Features() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition-all hover:scale-105 hover:shadow-lg"
            >
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
