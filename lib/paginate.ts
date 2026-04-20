export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const p = Math.max(1, Math.floor(page) || 1);
  const start = (p - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(count: number, pageSize: number): number {
  return Math.max(1, Math.ceil(count / pageSize));
}
