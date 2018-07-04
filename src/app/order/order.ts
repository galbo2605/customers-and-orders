export interface Order {
  id: number | null;
  customerId: number | null;
  orderName: string;
  orderNumber: number;
  starRating: number;
  description: string;
}
