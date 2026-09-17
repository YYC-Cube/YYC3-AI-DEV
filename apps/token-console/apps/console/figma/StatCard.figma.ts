/*
 * @Module : figma/StatCard.figma — StatCard Code Connect
 * @Family-Owner : 🔮 预见·先知（观测与预测域）
 */
import figma from "figma";
import { StatCard } from "@/domains/xianzhi/StatCard";

figma.connect(
  StatCard,
  "https://www.figma.com/file/YYC3_TOKEN_CONSOLE/04_Dashboard?node-id=stat-card",
  {
    props: {
      label: figma.string("Label"),
      value: figma.string("Value"),
      note: figma.string("Note"),
      tone: figma.enum("Tone", {
        Default: "default",
        Success: "success",
        Warning: "warning",
        Danger: "danger",
      }),
      blBadge: figma.string("BL Badge"),
    },
    example: ({ label, value, note, tone, blBadge }) => (
      <StatCard
        label={label}
        value={value}
        note={note}
        tone={tone}
        blBadge={blBadge}
      />
    ),
    storybook: { id: "🔮-xianzhi-statcard--default" },
  },
);
