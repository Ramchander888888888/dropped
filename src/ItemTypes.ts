export type ItemType = "container" | "row" | "col" | "card";

export type Item = {
  type: ItemType;
  props: any;
  children: Item[];
};
