export function maskAccountFixed(account: string): string {
  const visible = account.slice(-4);
  return `****${visible}`;
}
