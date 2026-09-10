import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("gap-analysis catalog input", () => {
  it("loads the checked-in TypeScript catalog without a temporary JSON file", () => {
    const output = execFileSync(
      "python3",
      [
        "-c",
        [
          "import runpy",
          "module = runpy.run_path('scripts/data-review/gap-analysis.py')",
          "charges = module['load_all_our_charges']()",
          "assert len(charges) > 7000",
          "assert len(module['load_our_charges']('KS', charges)) > 100",
          "assert all(charge['id'] and charge['jurisdiction'] for charge in charges)",
          "print(len(charges))",
        ].join("; "),
      ],
      { cwd: process.cwd(), encoding: "utf8" },
    ).trim();

    expect(Number(output)).toBeGreaterThan(7000);
  });
});