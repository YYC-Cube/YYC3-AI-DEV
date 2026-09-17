/*
 * @Module : components/console/ResponsiveTable — 表格响应式
 * @Family : 🔮 预见·先知
 */
"use client";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
  primary?: boolean;  // 移动卡片标题
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
}

export function ResponsiveTable<T extends Record<string, unknown>>({
  data,
  columns,
  getRowKey,
}: Props<T>) {
  const primary = columns.find((c) => c.primary) ?? columns[0];
  const rest = columns.filter((c) => c !== primary);

  return (
    <>
      {/* md+ 表格 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-border-default">
              {columns.map((c) => (
                <th key={String(c.key)} className="text-left py-2 px-3">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-border-default/50 hover:bg-bg-elevated"
              >
                {columns.map((c) => (
                  <td key={String(c.key)} className="py-2 px-3">
                    {c.render ? c.render(row) : String(row[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <md 卡片列表 */}
      <ul className="md:hidden space-y-2">
        {data.map((row) => (
          <li
            key={getRowKey(row)}
            className="p-3 rounded-md border border-border-default bg-bg-subtle"
          >
            <div className="font-medium text-body-md mb-2">
              {primary.render ? primary.render(row) : String(row[primary.key])}
            </div>
            <dl className="grid grid-cols-2 gap-2 text-caption">
              {rest.map((c) => (
                <div key={String(c.key)}>
                  <dt className="text-text-tertiary">{c.label}</dt>
                  <dd>{c.render ? c.render(row) : String(row[c.key] ?? "")}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
