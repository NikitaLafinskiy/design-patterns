interface PaymentService {
  paymentService: PayPalService | StripeService;
  withdraw: (amount: number) => number;
  topup: (amount: number) => number;
  showbalance: () => number;
}

class PayPalService {
  balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  getCash(amount: number) {
    this.balance = this.balance - amount;
    return this.balance;
  }

  increaseCash(amount: number) {
    this.balance = this.balance + amount;
    return this.balance;
  }

  seeCash() {
    return this.balance;
  }
}

class StripeService {
  balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  receiveMoney(amount: number) {
    this.balance = this.balance - amount;
    return this.balance;
  }

  increaseMoney(amount: number) {
    this.balance = this.balance + amount;
    return this.balance;
  }

  findMoney() {
    return this.balance;
  }
}

class PaymentAdapter implements PaymentService {
  paymentService: PayPalService | StripeService;

  constructor(paymentService: PayPalService | StripeService) {
    this.paymentService = paymentService;
  }

  withdraw(amount: number): number {
    if (this.paymentService instanceof PayPalService) {
      return this.paymentService.getCash(amount);
    } else {
      return this.paymentService.receiveMoney(amount);
    }
  }

  topup(amount: number): number {
    if (this.paymentService instanceof PayPalService) {
      return this.paymentService.increaseCash(amount);
    } else {
      return this.paymentService.receiveMoney(amount);
    }
  }

  showbalance(): number {
    if (this.paymentService instanceof PayPalService) {
      return this.paymentService.seeCash();
    } else {
      return this.paymentService.findMoney();
    }
  }
}

const paymentService = new PaymentAdapter(new PayPalService(1000));

console.log(paymentService.topup(500));
console.log(paymentService.showbalance());
