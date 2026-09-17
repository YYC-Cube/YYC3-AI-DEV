/*
 * @Module : scripts/contract/schema-extract — 提取关键 Schema 与端点清单
 * @Family : 🔮 预见·先知
 */
export interface ExtractedContract {
  openapi: string;
  info: { version: string; title?: string };
  paths: Record<string, Record<string, unknown>>;
  schemas: Record<string, unknown>;
  // 项目关键清单
  critical: {
    endpoints: string[];
    schemas: Record<string, string[]>;  // schemaName → 字段名列表
  };
}

const CRITICAL_SCHEMAS = [
  "ModelConfig",
  "ModelStat",
  "ErrorRecord",
  "UsageSummary",
  "HealthResponse",
];

export function extractContract(openapi: any): ExtractedContract {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const [p, ops] of Object.entries(openapi.paths ?? {})) {
    paths[p] = ops as Record<string, unknown>;
  }

  const schemas = openapi.components?.schemas ?? {};

  const endpoints: string[] = [];
  for (const [p, ops] of Object.entries(paths)) {
    for (const method of Object.keys(ops as object)) {
      if (["get", "post", "put", "patch", "delete"].includes(method)) {
        endpoints.push(`${method.toUpperCase()} ${p}`);
      }
    }
  }
  endpoints.sort();

  const criticalFields: Record<string, string[]> = {};
  for (const name of CRITICAL_SCHEMAS) {
    const schema = schemas[name];
    if (schema?.properties) {
      criticalFields[name] = Object.keys(schema.properties).sort();
    } else {
      criticalFields[name] = [];
    }
  }

  return {
    openapi: openapi.openapi ?? "unknown",
    info: {
      version: openapi.info?.version ?? "unknown",
      title: openapi.info?.title,
    },
    paths,
    schemas,
    critical: {
      endpoints,
      schemas: criticalFields,
    },
  };
}
