/**
 * Emit the catalog fields needed by the state gap-analysis script.
 *
 * This keeps the Python analysis tied to the checked-in TypeScript catalog
 * without requiring a generated /tmp file or duplicating catalog data.
 */
import { criminalCharges } from "../../shared/criminal-charges";

console.log(JSON.stringify(
  criminalCharges.map(({ id, name, code, jurisdiction, category }) => ({
    id,
    name,
    code,
    jurisdiction,
    category,
  })),
));