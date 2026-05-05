# Agent Instructions

- Do not run `bun run build` as routine verification by default; use it when the user asks for a production build, before release/deployment, or when framework/dependency/config changes need a production-build sanity check.
- For routine verification, use lighter checks such as `tsc --noEmit`, targeted lint/format checks, or Ultracite if it is added to the project.
- Prefer focused verification for the files changed instead of full production builds.
