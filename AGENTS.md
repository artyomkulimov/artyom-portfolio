# Agent Instructions

- After every code, content, config, or dependency change, run `bun run check` using Ultracite and then run `bun run build` to verify the production build.
- If Ultracite is missing, install and configure it for the project before running checks.
- After verification passes, stage the relevant changes, create a semantic commit message that explains the change, and push the commit.
- On `main` with the normal GitHub remote, use the standard flow: `git add`, `git commit -m "<semantic message>"`, and `git push`.
- If working on a different branch, inspect the branch/upstream first and adapt the add/commit/push flow to that branch's workflow. Ask before pushing only when the branch/remote situation is unclear.
