---
step: 9
title: "Hooks: Make the Review Non-Optional"
points: 20
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 9 — Hooks: Make the Review Non-Optional (20 pts)

## Learn

Hooks observe and control the agent loop from `hooks.json` (`version: 1`) at
project (`.cursor/hooks.json`) or user level[5][6]. `beforeShellExecution`
handles Cursor-triggered shell events, with a command string available to
match. Exit **0** means successful execution and may consume a JSON permission
decision; it is not unconditional permission. Exit **2** blocks. Other
non-zero exits fail open by default unless `failClosed: true` is set[5].

A rule is guidance; a permission hook can gate a covered action. The coverage
boundary matters as much as the script: this is not a Git server-side
control or a guarantee about pushes from an external terminal[5].
`afterFileEdit` runs after an edit, so it is useful for checks rather than
preventing that edit[5]. The title is the goal for covered events, not a
claim of universal enforcement.

## Implement

1. Read `.cursor/hooks.json`, `.cursor/hooks.opt-in.json`, and
   `.cursor/hooks/pre-push-check.sh`. Keep the existing registration intact.
   Draft a separate opt-in example in your tooling worktree; nothing in an
   example file runs merely because the file exists.
2. Use explicit command-hook type and failure policy in the draft[5]:

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "command",
        "command": ".cursor/hooks/pre-push-check.sh",
        "matcher": "git push",
        "failClosed": true
      }
    ]
  }
}
```

Project hooks run from the project root, so `.cursor/hooks/...` is the
appropriate project-relative shape[5]. `type: "command"` is explicit here
for clarity; command is already the documented default[5]. The matcher is
a narrow example, not a complete detector of every way to push.

3. Review the script's JSON response and exit status separately. The starter
   runs tests for a matching push string and reports denial on test failure.
   Do not break a money test or attempt a real push to demonstrate this.
4. Run the harmless fixture below in a disposable learner checkout, then
   compare actual Cursor permission behavior with the documented matrix.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/hooks/pre-push-check.sh`,
`.cursor/hooks.json`, and `.cursor/hooks.opt-in.json`. The first is the
script to understand; the latter two are registration examples to compare,
not files to overwrite wholesale.

#### Minimal working example

In a disposable learner checkout, create `.cursor/hooks/hook-probe.sh`:

```bash
case "$1" in
  allow) printf '%s\n' '{"permission":"allow"}' ;;
  deny) printf '%s\n' '{"permission":"deny","user_message":"Workshop probe denied"}' ;;
  block) exit 2 ;;
  fail) exit 1 ;;
  invalid) printf '%s\n' 'not-json' ;;
  empty) exit 0 ;;
  timeout) sleep 5 ;;
  *) exit 2 ;;
esac
```

Invoke it directly first, without any push:

```bash
bash .cursor/hooks/hook-probe.sh deny
printf 'exit=%s\n' "$?"
bash .cursor/hooks/hook-probe.sh block
printf 'exit=%s\n' "$?"
```

The deny fixture prints JSON and exits 0; the block fixture exits 2.
These direct calls prove only script output/status, not Cursor enforcement.
For the Cursor-side probe, register the following **only in the disposable
checkout's** `.cursor/hooks.json`, after reviewing its existing contents:

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "command",
        "command": "bash .cursor/hooks/hook-probe.sh deny",
        "matcher": "WORKSHOP_HOOK_PROBE",
        "failClosed": true,
        "timeout": 1
      }
    ]
  }
}
```

Ask Cursor to run exactly `printf '%s\n' WORKSHOP_HOOK_PROBE` in that
checkout. It only prints a marker if allowed. Confirm the hook was invoked;
otherwise the observation does not test the response semantics. Change one
fixture argument or `failClosed` value at a time. Never use `git push` as
the probe command. Timeout is specified in seconds[5].

#### Expected diff

A separate proposed registration and fixture in the learner tooling work,
plus a results table in your notes. No money-test edits, no changes to the
original `.cursor/hooks.json`, and no real push. The disposable checkout's
registration is temporary; remove only your fixture/registration changes
when finished, preserving anything that existed before the exercise.

#### Hints

- JSON `permission: "deny"` can deny even with exit 0. Record both channels[5].
- Set `failClosed` explicitly in each run; otherwise its default is false[5].
- Save sanitized hook diagnostics and whether the marker command executed.
  A model declining to call the terminal is not an observed hook denial.

#### Solution approach

Use this documentation-backed matrix[5]; fill an **Observed** column yourself.
An unrun case stays “not exercised,” never “passed.”

| Fixture | Exit/output | failClosed false | failClosed true |
|---|---|---|---|
| allow | 0, valid allow JSON | Allow | Allow |
| deny | 0, valid deny JSON | Deny | Deny |
| block | 2 | Block | Block |
| fail | 1 | Fail open | Block |
| invalid | 0, invalid JSON | Block permission hook | Block |
| empty | 0, no response | Block invalid permission response | Block |
| timeout | exceeds 1 second | Fail open | Block |

Permission hooks reject invalid JSON/schema even without `failClosed`;
`failClosed: true` additionally blocks failures such as crashes and timeouts[5].
If observation differs, stop and capture the config, installed version,
exit/output, and hook diagnostic. Do not broaden the enforcement claim.

#### Expected result

A completed or explicitly blocked seven-case matrix demonstrating the
separation between success, permission, and failure policy. Local docs or
site lint cannot substitute for this runtime evidence.

[SCREENSHOT: Harmless marker denied by the hook, with matching fixture and expected/observed matrix]

### Common mistakes

- **Mistake 1:** Saying all non-zero exits block. Exit 2 blocks; other
  non-zero exits fail open by default unless `failClosed` is true[5].
- **Mistake 2:** Saying exit 0 always allows. Inspect the JSON permission
  decision, including denial and invalid-response handling[5].
- **Mistake 3:** Treating a Cursor hook as a Git server-side guarantee.
  Test only covered Cursor events; use independent repository controls for
  a broader release policy[5].

### Working habits

- **Pro tip 1:** Use a harmless marker for failure tests, never an actual push.
- **Pro tip 2:** Keep direct script tests separate from Cursor event tests;
  both are necessary to understand a failure.

#### Stretch goal

Add a nonmatching harmless command to the results table. Show the difference
between “hook was not invoked” and “hook ran and allowed,” without trying
to evade a real release control.

## Advanced

Start with a small number of hooks as a workshop preference, not a product
limit. Every added hook needs an owner, failure-path evidence, and a recovery
procedure. Local coverage is not cloud coverage: Cloud Agent hooks start in
a writable environment, not early read-only turns, and local home-directory
hooks are unavailable there[31]. Do not infer universal enforcement or
multi-source merge behavior from this single-source local exercise[5][7].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
