export type Locale = "en" | "es";
export const LOCALES: readonly Locale[] = ["en", "es"];

export interface Strings {
  disclaimer: string;
  navSteps: string;
  navGlossary: string;
  navBibliography: string;
  navDiagrams: string;
  languageLabel: string;
  homeHeading: string;
  versionLabel: string;
  personaLabel: string;
  personaAll: string;
  stepsSuffix: string;
  pointsSuffix: string;
  allSteps: string;
  ptsModule: string;
  stepSectionsLabel: string;
  tabCompleted: string;
  revisionChanged: string;
  reviewRevision: string;
  selfReportTitle: string;
  selfReportIntro: string;
  selfReportExpectedResult: string;
  selfReportOutcome: string;
  selfReportLegacy: string;
  markStepComplete: string;
  quizTitle: string;
  quizIntro: string;
  gradeAnswers: string;
  quizScore: string;
  quizCorrect: string;
  quizWrong: string;
  storageSelfReportNote: string;
  storageLocalNote: string;
  storageSyncNote: string;
  saveToFile: string;
  overwriteFile: string;
  loadFromFile: string;
  exportProgress: string;
  exportSnapshot: string;
  rawRecovery: string;
  importLabel: string;
  retryStorage: string;
  fileUnsupported: string;
  rawRecoveryNote: string;
  retiredSummary: string;
  retiredNote: string;
  retiredComplete: string;
  retiredNotComplete: string;
  confirmTitle: string;
  confirmBody: string;
  confirmReplace: string;
  cancelImport: string;
  busyNote: string;
  summaryRemaining: string;
  summaryLine: string;
  summaryNote: string;
  continueLabel: string;
  startNextLabel: string;
  lastVisitedNote: string;
  firstUnfinishedNote: string;
  allDoneNote: string;
  noMatchNote: string;
  loadingProgress: string;
  stepNavLabel: string;
  previousLabel: string;
  nextLabel: string;
  allStepsComplete: string;
  copyCode: string;
  copyDone: string;
  copyFailed: string;
  glossaryTitle: string;
  bibliographyTitle: string;
  diagramsTitle: string;
  bibliographyNote: string;
  saveChosen: string;
  saveOverwritten: string;
  saveFailed: string;
  noRememberedFile: string;
  fileReadConfirm: string;
  fileLoadRejected: string;
  recoveryDownloaded: string;
  snapshotDownloaded: string;
  exportDownloaded: string;
  exportFailed: string;
  importRejected: string;
  importedSaved: string;
  readingLocalFile: string;
  storageUnavailable: string;
  cannotSave: string;
  savingFailed: string;
  errorPrefix: string;
  stepLinkLabel: string;
  statsLine: string;
  eyebrowLine: string;
  indexEntry: string;
}

const en: Strings = {
  disclaimer: "Unofficial workshop. One person's version of how to teach Cursor. Not affiliated with, endorsed by, or sponsored by Cursor (Anysphere).",
  navSteps: "Steps",
  navGlossary: "Glossary",
  navBibliography: "Bibliography",
  navDiagrams: "Diagrams",
  languageLabel: "Español",
  homeHeading: "Join Hearthline on day one. Ship a real feature. Learn every Cursor surface.",
  versionLabel: "Version:",
  personaLabel: "Persona:",
  personaAll: "all",
  stepsSuffix: "steps",
  pointsSuffix: "points",
  allSteps: "All steps",
  ptsModule: "pts",
  stepSectionsLabel: "Step sections",
  tabCompleted: "Completed",
  revisionChanged: "Content changed since your self-report. Your completion is retained; review is recommended, not proof of lost mastery.",
  reviewRevision: "I reviewed this revision",
  selfReportTitle: "Step self-report",
  selfReportIntro: "Check the",
  selfReportExpectedResult: "Expected result",
  selfReportOutcome: "for this step, then mark the whole step complete. Points are counted once per step; the outcome is verified against that expected result.",
  selfReportLegacy: "Previous version flags are preserved. They do not mark any section learned.",
  markStepComplete: "Mark step complete (self-report)",
  quizTitle: "Knowledge check",
  quizIntro: "Five questions. Self-graded, instant feedback, no points. Answer all five to see your score.",
  gradeAnswers: "Grade my answers",
  quizScore: "Your score: {score} / {total}. The answers are self-reported practice, not proof of mastery.",
  quizCorrect: "Correct",
  quizWrong: "Not the expected answer",
  storageSelfReportNote: "Progress is an explicit self-report, not proof of learning or mastery. Viewing a tab never marks it complete.",
  storageLocalNote: "Saved only in this browser/profile on this site. Storage may be lost when browser data is cleared or unavailable in private browsing. No accounts, telemetry, or backend sync.",
  storageSyncNote: "Future sync is out of scope unless cross-device needs are demonstrated and cost/privacy approval is given.",
  saveToFile: "Save to hearthline-progress.json",
  overwriteFile: "Overwrite progress file",
  loadFromFile: "Load from saved progress file",
  exportProgress: "Export progress JSON",
  exportSnapshot: "Export last valid snapshot JSON",
  rawRecovery: "Download raw recovery data",
  importLabel: "Import progress JSON (max 1 MB)",
  retryStorage: "Retry storage access",
  fileUnsupported: "Saving to one progress file needs the File System Access API (Chrome or Edge). In other browsers, use Export and Import JSON instead.",
  rawRecoveryNote: "Raw recovery contains the original stored text, unchanged, including malformed data. It is not a validated import file.",
  retiredSummary: "Retired section history: review recommended",
  retiredNote: "Removed or renamed sections are retained for history, not mapped to new sections or counted as their completion.",
  retiredComplete: "reported complete",
  retiredNotComplete: "not reported complete",
  confirmTitle: "Confirm progress replacement",
  confirmBody: "Replace all progress in this browser with the imported file? Export your current progress first. This also replaces the saved Resume location.",
  confirmReplace: "Confirm replace progress",
  cancelImport: "Cancel import",
  busyNote: "Reading or writing your progress file…",
  summaryRemaining: "steps remaining",
  summaryLine: "{remaining} steps remaining · {earned} points earned (self-reported) · {completed} steps complete",
  summaryNote: "Completion counts once per step: whole-step self-report (including legacy flags) or all sections reported complete. Outcome alone earns no points. Revisions retain completion and may request review.",
  continueLabel: "Continue: Step {step} · {section}",
  startNextLabel: "Start next unfinished: Step {step} · {section}",
  lastVisitedNote: "Last visited section within your selected track/persona.",
  firstUnfinishedNote: "No saved location in this selection; showing its first unfinished step.",
  allDoneNote: "All selected steps are reported complete. Revisit any step below.",
  noMatchNote: "No steps match this selection.",
  loadingProgress: "Loading local progress…",
  stepNavLabel: "Step navigation",
  previousLabel: "Previous: Step {step}: {title}",
  nextLabel: "Next: Step {step}: {title}",
  allStepsComplete: "All steps complete",
  copyCode: "Copy code",
  copyDone: "Copied.",
  copyFailed: "Copy failed. Select the code and copy it manually.",
  glossaryTitle: "Glossary",
  bibliographyTitle: "Bibliography",
  diagramsTitle: "Diagrams",
  bibliographyNote: "All URLs fetched HTTP 200 on 2026-09-11 unless noted.",
  saveChosen: "Progress file hearthline-progress.json chosen and saved. Future saves overwrite it.",
  saveOverwritten: "Progress overwritten in hearthline-progress.json.",
  saveFailed: "File save failed. {reason}",
  noRememberedFile: "No remembered progress file. Save to a file first.",
  fileReadConfirm: "File read. Confirm to replace the progress in this browser.",
  fileLoadRejected: "File load rejected; existing progress unchanged. {reason}",
  recoveryDownloaded: "Original stored text downloaded unchanged for recovery. It may be malformed and is not a validated progress backup.",
  snapshotDownloaded: "Last valid snapshot downloaded. It does not include unreadable stored changes.",
  exportDownloaded: "Export downloaded. Keep it somewhere safe.",
  exportFailed: "Export failed. Please retry before leaving this page.",
  importRejected: "Import rejected; existing progress unchanged. {reason}",
  importedSaved: "Progress imported and saved.",
  readingLocalFile: "Reading local file…",
  storageUnavailable: "Storage is unavailable. Nothing was saved.",
  cannotSave: "Cannot save progress",
  savingFailed: "Saving failed. Existing progress is unchanged.",
  errorPrefix: "Existing progress is unchanged.",
  stepLinkLabel: "Step {step}: {title}",
  statsLine: "{count} steps · {total} points · {version}",
  eyebrowLine: "{module} · {points} pts",
  indexEntry: "({points} pts · {module})",
};

const es: Strings = {
  disclaimer: "Taller no oficial. La versión de una sola persona sobre cómo enseñar Cursor. Sin afiliación, respaldo ni patrocinio de Cursor (Anysphere).",
  navSteps: "Pasos",
  navGlossary: "Glosario",
  navBibliography: "Bibliografía",
  navDiagrams: "Diagramas",
  languageLabel: "English",
  homeHeading: "Únete a Hearthline el primer día. Entrega una funcionalidad real. Aprende todas las superficies de Cursor.",
  versionLabel: "Versión:",
  personaLabel: "Perfil:",
  personaAll: "todos",
  stepsSuffix: "pasos",
  pointsSuffix: "puntos",
  allSteps: "Todos los pasos",
  ptsModule: "pts",
  stepSectionsLabel: "Secciones del paso",
  tabCompleted: "Completada",
  revisionChanged: "El contenido cambió desde tu autoinforme. Tu completitud se conserva; se recomienda revisarlo, no es prueba de pérdida de dominio.",
  reviewRevision: "Revisé esta revisión",
  selfReportTitle: "Autoinforme del paso",
  selfReportIntro: "Revisa el",
  selfReportExpectedResult: "Resultado esperado",
  selfReportOutcome: "de este paso y luego marca el paso completo. Los puntos se cuentan una vez por paso; el resultado se verifica contra ese resultado esperado.",
  selfReportLegacy: "Las banderas de la versión anterior se conservan. No marcan ninguna sección como aprendida.",
  markStepComplete: "Marcar el paso completo (autoinforme)",
  quizTitle: "Comprobación de conocimiento",
  quizIntro: "Cinco preguntas. Autocalificadas, retroalimentación inmediata, sin puntos. Responde las cinco para ver tu calificación.",
  gradeAnswers: "Calificar mis respuestas",
  quizScore: "Tu calificación: {score} / {total}. Las respuestas son práctica autoinformada, no prueba de dominio.",
  quizCorrect: "Correcta",
  quizWrong: "No es la respuesta esperada",
  storageSelfReportNote: "El progreso es un autoinforme explícito, no prueba de aprendizaje ni de dominio. Ver una pestaña nunca la marca como completa.",
  storageLocalNote: "Guardado solo en este navegador/perfil en este sitio. El almacenamiento puede perderse al borrar los datos del navegador o no estar disponible en navegación privada. Sin cuentas, telemetría ni sincronización con servidor.",
  storageSyncNote: "La sincronización futura está fuera de alcance salvo que se demuestre necesidad entre dispositivos y se apruebe costo/privacidad.",
  saveToFile: "Guardar en hearthline-progress.json",
  overwriteFile: "Sobrescribir el archivo de progreso",
  loadFromFile: "Cargar desde el archivo de progreso guardado",
  exportProgress: "Exportar progreso JSON",
  exportSnapshot: "Exportar la última instantánea válida JSON",
  rawRecovery: "Descargar datos de recuperación en bruto",
  importLabel: "Importar progreso JSON (máx. 1 MB)",
  retryStorage: "Reintentar acceso al almacenamiento",
  fileUnsupported: "Guardar en un único archivo de progreso requiere la File System Access API (Chrome o Edge). En otros navegadores, usa Exportar e Importar JSON.",
  rawRecoveryNote: "La recuperación en bruto contiene el texto original guardado sin cambios, incluidos los datos malformados. No es un archivo de importación validado.",
  retiredSummary: "Historial de secciones retiradas: se recomienda revisar",
  retiredNote: "Las secciones eliminadas o renombradas se conservan por historial, no se asignan a secciones nuevas ni cuentan como su completitud.",
  retiredComplete: "informado completo",
  retiredNotComplete: "no informado completo",
  confirmTitle: "Confirmar reemplazo de progreso",
  confirmBody: "¿Reemplazar todo el progreso de este navegador con el archivo importado? Exporta tu progreso actual primero. Esto también reemplaza la ubicación de Reanudar.",
  confirmReplace: "Confirmar reemplazo de progreso",
  cancelImport: "Cancelar importación",
  busyNote: "Leyendo o escribiendo tu archivo de progreso…",
  summaryRemaining: "pasos restantes",
  summaryLine: "{remaining} pasos restantes · {earned} puntos ganados (autoinformado) · {completed} pasos completos",
  summaryNote: "La completitud se cuenta una vez por paso: autoinforme del paso completo (incluidas banderas heredadas) o todas las secciones informadas completas. El resultado por sí solo no gana puntos. Las revisiones conservan la completitud y pueden solicitar revisión.",
  continueLabel: "Continuar: Paso {step} · {section}",
  startNextLabel: "Empezar el siguiente sin completar: Paso {step} · {section}",
  lastVisitedNote: "Última sección visitada dentro de tu pista/perfil seleccionado.",
  firstUnfinishedNote: "Sin ubicación guardada en esta selección; se muestra su primer paso sin completar.",
  allDoneNote: "Todos los pasos seleccionados están informados como completos. Revisa cualquier paso abajo.",
  noMatchNote: "Ningún paso coincide con esta selección.",
  loadingProgress: "Cargando progreso local…",
  stepNavLabel: "Navegación entre pasos",
  previousLabel: "Anterior: Paso {step}: {title}",
  nextLabel: "Siguiente: Paso {step}: {title}",
  allStepsComplete: "Todos los pasos completos",
  copyCode: "Copiar código",
  copyDone: "Copiado.",
  copyFailed: "Copia fallida. Selecciona el código y cópialo manualmente.",
  glossaryTitle: "Glosario",
  bibliographyTitle: "Bibliografía",
  diagramsTitle: "Diagramas",
  bibliographyNote: "Todas las URLs devolvieron HTTP 200 el 2026-09-11 salvo nota en contrario.",
  saveChosen: "Archivo de progreso hearthline-progress.json elegido y guardado. Los próximos guardados lo sobrescriben.",
  saveOverwritten: "Progreso sobrescrito en hearthline-progress.json.",
  saveFailed: "Falló el guardado en archivo. {reason}",
  noRememberedFile: "No hay archivo de progreso recordado. Guarda en un archivo primero.",
  fileReadConfirm: "Archivo leído. Confirma para reemplazar el progreso de este navegador.",
  fileLoadRejected: "Carga de archivo rechazada; el progreso existente no cambió. {reason}",
  recoveryDownloaded: "Texto original descargado sin cambios para recuperación. Puede estar malformado y no es una copia de seguridad validada.",
  snapshotDownloaded: "Última instantánea válida descargada. No incluye los cambios ilegibles del almacenamiento.",
  exportDownloaded: "Exportación descargada. Guárdala en un lugar seguro.",
  exportFailed: "Falló la exportación. Reinténtalo antes de salir de esta página.",
  importRejected: "Importación rechazada; el progreso existente no cambió. {reason}",
  importedSaved: "Progreso importado y guardado.",
  readingLocalFile: "Leyendo archivo local…",
  storageUnavailable: "El almacenamiento no está disponible. No se guardó nada.",
  cannotSave: "No se puede guardar el progreso",
  savingFailed: "Falló el guardado. El progreso existente no cambió.",
  errorPrefix: "El progreso existente no cambió.",
  stepLinkLabel: "Paso {step}: {title}",
  statsLine: "{count} pasos · {total} puntos · {version}",
  eyebrowLine: "{module} · {points} pts",
  indexEntry: "({points} pts · {module})",
};

export const STRINGS: Record<Locale, Strings> = { en, es };

const TAB_LABELS_ES: Record<string, string> = {
  "The project": "El proyecto",
  "Learn": "Aprender",
  "Implement": "Implementar",
  "Pro tips": "Consejos",
  "Terminology": "Terminología",
  "Advanced": "Avanzado",
  "Quiz": "Comprobación",
};

/** Structural H2 headings stay English in the source (parser contract); only the displayed label localizes. */
export function tabLabel(locale: Locale, label: string): string {
  return locale === "es" ? TAB_LABELS_ES[label] ?? label : label;
}

const KIT_LABELS_ES: Record<string, string> = {
  "Exercise kit": "Kit de ejercicios",
  "Starter code path": "Ruta de código inicial",
  "Minimal working example": "Ejemplo mínimo funcional",
  "Expected diff": "Diff esperado",
  "Hints": "Pistas",
  "Solution approach": "Enfoque de solución",
  "Expected result": "Resultado esperado",
  "Stretch goal": "Objetivo adicional",
  "Common mistakes": "Errores comunes",
  "Pro tips": "Consejos",
  "Diagrams": "Diagramas",
};

/** Structural H3/H4 headings stay English in the source (parser + anchor contract); only the displayed label localizes. */
export function kitLabel(locale: Locale, label: string): string {
  return locale === "es" ? KIT_LABELS_ES[label] ?? label : label;
}

export function strings(locale: Locale): Strings {
  return STRINGS[locale];
}

/** Template interpolation: t("quizScore", { score: 3, total: 5 }) */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function localePath(locale: Locale, path: string): string {
  const stripped = path.replace(/^\/(es)(\/|$)/, "/");
  return locale === "es" ? `/es${stripped === "/" ? "" : stripped}` : stripped;
}

