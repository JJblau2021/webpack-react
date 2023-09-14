export default function GlobalFor<T>({ items, render, fallback }: ForProps<T>) {
  if (!items || items.length === 0) return fallback;
  return items.map(render);
}
