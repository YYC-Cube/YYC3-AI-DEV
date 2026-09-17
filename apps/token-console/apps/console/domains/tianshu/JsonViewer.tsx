/*
 * @Module : domains/tianshu/JsonViewer
 */
"use client";

export function JsonViewer({ data }: { data: unknown }) {
  return (
    <pre className="p-3 rounded-md bg-bg-elevated overflow-auto text-caption font-mono max-h-96">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
