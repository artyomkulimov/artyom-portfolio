# Agent Instructions

- Do not run `bun run build` in this repository unless the user explicitly asks for a production build.
- For routine verification, use lighter checks such as `tsc --noEmit`, targeted lint/format checks, or Ultracite if it is added to the project.
- Prefer focused verification for the files changed instead of full production builds.
