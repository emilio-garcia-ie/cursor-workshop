import HomeView from "@/components/pages/HomeView";

export default async function Page({ searchParams }: { searchParams: Promise<{ version?: string; persona?: string }> }) {
  return <HomeView locale="es" searchParams={await searchParams} />;
}