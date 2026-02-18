import type { Config } from "release-it";

const isSkipCi = process.env.SKIP_CI === "1" || process.env.SKIP_CI === "true";

const commitMessage = isSkipCi
  ? "chore: release v${version} [skip ci]"
  : "chore: release v${version}";

export default {
  git: {
    commit: true,
    tag: true,
    push: true,
    commitMessage,
  },
  github: {
    release: true,
    releaseName: "v${version}",
  },
  hooks: {
    "before:init": ["bun check", "bun run test"],
    "after:release":
      "echo Successfully released ${name} v${version} to ${repo.repository}.",
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "feat", section: "Features" },
          { type: "fix", section: "Bug Fixes" },
          { type: "refactor", section: "Code Refactoring" },
        ],
      },
      ignoreRecommendedBump: true,
    },
  },
} satisfies Config;
