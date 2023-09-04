export function createCategoryPayload({
  color,
  icon,
  name,
}: {
  color: unknown;
  icon: unknown;
  name: unknown;
}) {
  if (typeof color !== "string") throw new Error("Invalid color");
  if (typeof icon !== "string") throw new Error("Invalid icon");
  if (typeof name !== "string") throw new Error("Invalid category name");
  return {
    color,
    icon,
    name: name.toLowerCase(),
  };
}

export type CreateCategoryPayload = ReturnType<typeof createCategoryPayload>;
