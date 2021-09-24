export function NumberFormat(value: number): any {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
