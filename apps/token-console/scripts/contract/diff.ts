/*
 * @Module : scripts/contract/diff — 字段级契约差异
 * @Family : 🔮 预见·先知（见微知著）
 */
import type { ExtractedContract } from "./schema-extract";

export interface ContractDiff {
  hasChanges: boolean;
  endpoints: {
    added: string[];
    removed: string[];
  };
  schemas: {
    added: string[];
    removed: string[];
    fields: Record<
      string,
      {
        added: string[];
        removed: string[];
      }
    >;
  };
  info: {
    versionChanged: boolean;
    oldVersion: string;
    newVersion: string;
  };
}

export function diffContracts(
  oldC: ExtractedContract,
  newC: ExtractedContract,
): ContractDiff {
  // 端点差异
  const oldEps = new Set(oldC.critical.endpoints);
  const newEps = new Set(newC.critical.endpoints);
  const addedEps = [...newEps].filter((e) => !oldEps.has(e)).sort();
  const removedEps = [...oldEps].filter((e) => !newEps.has(e)).sort();

  // Schema 差异
  const oldSchemas = new Set(Object.keys(oldC.schemas));
  const newSchemas = new Set(Object.keys(newC.schemas));
  const addedSchemas = [...newSchemas].filter((s) => !oldSchemas.has(s)).sort();
  const removedSchemas = [...oldSchemas]
    .filter((s) => !newSchemas.has(s))
    .sort();

  // 关键 Schema 字段差异
  const fieldDiff: ContractDiff["schemas"]["fields"] = {};
  for (const name of Object.keys(newC.critical.schemas)) {
    const oldF = new Set(oldC.critical.schemas[name] ?? []);
    const newF = new Set(newC.critical.schemas[name] ?? []);
    const added = [...newF].filter((f) => !oldF.has(f)).sort();
    const removed = [...oldF].filter((f) => !newF.has(f)).sort();
    if (added.length || removed.length) {
      fieldDiff[name] = { added, removed };
    }
  }

  const hasChanges =
    addedEps.length > 0 ||
    removedEps.length > 0 ||
    addedSchemas.length > 0 ||
    removedSchemas.length > 0 ||
    Object.keys(fieldDiff).length > 0 ||
    oldC.info.version !== newC.info.version;

  return {
    hasChanges,
    endpoints: { added: addedEps, removed: removedEps },
    schemas: { added: addedSchemas, removed: removedSchemas, fields: fieldDiff },
    info: {
      versionChanged: oldC.info.version !== newC.info.version,
      oldVersion: oldC.info.version,
      newVersion: newC.info.version,
    },
  };
}
