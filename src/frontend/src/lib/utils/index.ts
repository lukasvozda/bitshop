export enum Status {
  SUCCESS,
  ERROR
}

export enum OrderStatus {
  WAITING_FOR_PAYMENT = "WaitingForPayment",
  USER_CONFIRMED_PAYMENT = "UserConfirmedPayment",
  TRANSACTION_CONFIRMED = "TransactionConfirmed"
}
