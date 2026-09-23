# Vendored agent skills

Third-party skills vendored for the Hearthline workshop project. Each is
copied unmodified from its upstream repository; this directory is a
convenience so the project is self-contained. See the upstream sources for
full documentation and update procedures.

## anti-slop (v3.2.9 line)

- Source: https://github.com/miqdadbadjuber/anti-slop
- Vendored commit: `d8529a6c8c005dc32bb0103a0ea0fa9c563fc5ad`
- License: MIT
- Vendored folders: `antislop`, `antislop-ui`, `antislop-copywriting`,
  `antislop-human`, `antislop-layoutmobile`. (`antislop-code` is intentionally
  not vendored: this project has no generated code comments to filter.)
- Usage: anti-slop is used in DURING mode for site UI/copy work. Curriculum
  prose and console documentation are treated as documentation content and
  are exempt from the R-02 em-dash ban per the core skill's carve-out
  categories. A `site/DESIGN.md` supplies the direction required by R-37.

## ui-ux-pro-max

- Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Vendored commit: `de5f12b400775997d213524ef02a7c7d2746806f`
- License: MIT
- Contents: `SKILL.md`, `data/`, `references/`, `scripts/`.
- Usage: run the search tool by its full path:
  `python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>`.
  Requires Python 3.x, no external dependencies.

## Updating

To update either skill, clone the upstream repository at the referenced
commit or a newer release, copy the folders here, and update the vendored
commit hash above plus any applicable notes in `site/DESIGN.md` or this file.
Do not edit skill files in place; treat them as upstream artifacts.