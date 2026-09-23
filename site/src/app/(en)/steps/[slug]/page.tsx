import StepView, { stepStaticParams } from "@/components/pages/StepView";

export function generateStaticParams() {
  return stepStaticParams("en");
}

export default async function Page({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ version?: string; persona?: string }>;
}) {
  const { slug } = await params;
  return <StepView locale="en" slug={slug} searchParams={await searchParams ?? {}} />;
}