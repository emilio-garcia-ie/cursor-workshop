/** Version + persona track map. Single source: mirrors tracks.md exactly. */

export const SHORT: number[] = [1, 2, 3, 5, 6, 7, 8, 9, 11, 12];
export const MEDIUM: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 17, 20, 22, 25, 27, 29,
];

export const VERSIONS = ["short", "medium", "long"] as const;
export type Version = (typeof VERSIONS)[number];

export const PERSONAS = [
  "vibecoders",
  "developers",
  "data-scientists",
  "ai-engineers",
  "forward-deployed",
] as const;
export type Persona = (typeof PERSONAS)[number];

/** Display labels for persona filter buttons (ES localized; EN identity). */
export const PERSONA_LABELS_ES: Record<string, string> = {
  vibecoders: "vibecoders",
  developers: "desarrolladores",
  "data-scientists": "científicos de datos",
  "ai-engineers": "ingenieros de IA",
  "forward-deployed": "forward-deployed",
};

/** Display labels for module names (ES localized; EN identity). */
export const MODULE_LABELS_ES: Record<string, string> = {
  Foundations: "Fundamentos",
  Building: "Construcción",
  Guardrails: "Salvaguardias",
  "The Fast Loop": "El bucle rápido",
  "Debug & Test": "Depuración y pruebas",
  "Team & Scale": "Equipo y escala",
  Bonus: "Extra",
};

export function personaLabel(locale: string, persona: string): string {
  return locale === "es" ? PERSONA_LABELS_ES[persona] ?? persona : persona;
}

export function moduleLabel(locale: string, module: string): string {
  return locale === "es" ? MODULE_LABELS_ES[module] ?? module : module;
}

export const PERSONA_STEPS: Record<Persona, number[]> = {
  vibecoders: [1, 2, 3, 5, 16, 17, 21, 23],
  developers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19, 20, 21, 22],
  "data-scientists": [1, 2, 4, 5, 18, 22, 24],
  "ai-engineers": [6, 7, 8, 9, 13, 24, 29, 30],
  "forward-deployed": [5, 11, 25, 26, 27, 31, 32, 33],
};

export function stepsFor(version: Version): number[] | null {
  if (version === "short") return SHORT;
  if (version === "medium") return MEDIUM;
  return null; // long: everything
}
