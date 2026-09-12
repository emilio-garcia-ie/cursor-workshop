# Citation format (contract)

- Inline markers: `[n]` where n matches `bibliography.md` entry number.
- Rendered as hyperlink superscripts pointing at the bibliography anchor.
- Every `[n]` MUST resolve to an existing entry; every mechanism claim
  (feature, shortcut, flag, price, limit) MUST carry at least one `[n]`.
- Third-party claims (not Cursor docs, not this repo) are tagged `[third-party]`
  immediately after the marker: `[12][third-party]`.
- No bare URLs in prose; no uncited mechanism claims.

## Example

```markdown
Rules live in `.cursor/rules` as `.mdc` files[4]. Team rules ship from the
dashboard on Team/Enterprise plans[9][third-party].
```
