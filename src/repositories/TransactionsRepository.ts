import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acc.income += transaction.value;
            break;
          case 'outcome':
            acc.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;
    return { income, outcome, total };
  }

  // const income = transaction
  //   .filter(it => it.type === 'income')
  //   .map(it => it.value)
  //   .reduce((acc, cur) => acc + cur);

  // const outcome = transaction
  //   .filter(it => it.type === 'outcome')
  //   .map(it => it.value)
  //   .reduce((acc, cur) => acc + cur);

  // const total = income - outcome;
  // if (total < outcome) {
  //   throw Error('Operation not allowed');
  // }

  // const balance = { income, outcome, total };

  // return balance;

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
