import { Brain, Code2, Zap, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Code Analysis",
    description:
      "Leverage GPT-4o-mini for intelligent code understanding and contextual answers",
  },
  {
    icon: Code2,
    title: "GitHub Integration",
    description:
      "Seamless access to repositories using your GitHub token and Octokit API",
  },
  {
    icon: Zap,
    title: "Smart Repository Indexing",
    description:
      "Automatic code embedding generation for enhanced search and analysis",
  },
  {
    icon: Network,
    title: "Interactive Q&A",
    description:
      "Ask questions about any codebase and get AI-powered explanations with code references",
  },
];

export function Features() {
  return (
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
  );
}
