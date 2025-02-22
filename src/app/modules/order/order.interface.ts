import { Types } from 'mongoose'

export type TOrder = {
  userId: Types.ObjectId
  products: { name: string }[]
  totalAmount: number
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'
  paymentMethod: 'COD' | 'Card'
  transactionId?: string // If online payment
  createdAt: Date
  updatedAt: Date
}
