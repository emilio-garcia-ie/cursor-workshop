import { getSteps } from "./curriculum";

export type Locale = "en" | "es";
export interface NavTarget { slug: string; step: number; title: string }
export interface StepNav {
  previous: NavTarget | null;
  next: NavTarget | null;
}

function toTarget(slug: string, steps = getSteps()): NavTarget | null {
  const step = steps.find(s => s.slug === slug);
  return step ? { slug: step.slug, step: step.step, title: step.title } : null;
}

/** Previous/next by index ±1 in the full ordered curriculum (null at boundaries). */
export function stepNav(slug: string, steps = getSteps()): StepNav {
  const index = steps.findIndex(s => s.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? toTarget(steps[index - 1].slug, steps) : null,
    next: index < steps.length - 1 ? toTarget(steps[index + 1].slug, steps) : null,
  };
}

/** Locale-prefixed href for a step, preserving any version/persona query string. */
export function stepHref(slug: string, locale: Locale, searchParams?: string): string {
  const prefix = locale === "es" ? "/es" : "";
  const path = `${prefix}/steps/${slug}`;
  const query = searchParams && searchParams.length > 1 ? searchParams : "";
  return query ? `${path}?${query.replace(/^\?/, "")}` : path;
}

export function isLastStep(slug: string, steps = getSteps()): boolean {
  return steps.findIndex(s => s.slug === slug) === steps.length - 1;
}