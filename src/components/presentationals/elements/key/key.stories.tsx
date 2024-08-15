import { Meta, StoryObj } from "@storybook/react";
import { Key } from "./key";
import { KeyKind } from "@/components/containers/const/key/kinds";

const meta: Meta<typeof Key> = {
  title: "key",
  component: Key,
};

export default meta;

type Story = StoryObj<typeof Key>;

export const SymbolEmpty: Story = {
  args: { kind: KeyKind.STANDARD },
};
export const SymbolUnEmpty: Story = {
  args: { symbol: "A", kind: KeyKind.STANDARD },
};
export const KindTiny: Story = {
  args: { kind: KeyKind.STANDARD },
};
export const KindSmall: Story = {
  args: { kind: KeyKind.STANDARD },
};
export const KindMedium: Story = {
  args: { kind: KeyKind.STANDARD },
};
export const KindHalfLarge: Story = {
  args: { kind: KeyKind.STANDARD },
};
export const KindLarge: Story = {
  args: { kind: KeyKind.LARGE },
};
export const KindSpace: Story = {
  args: { kind: KeyKind.SPACE },
};
export const Press: Story = {
  args: { isPress: true, kind: KeyKind.STANDARD },
};
export const UnPress: Story = {
  args: { isPress: false, kind: KeyKind.STANDARD },
};
