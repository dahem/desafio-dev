import _ from 'lodash';
import connection from '../connection.js';
import { GMTBrasiltoStandard } from '../util/date.js';

export async function uploadCNAB(file, userId) {
  const text = file.data.toString('utf8');
  const lines = text.split('\n');
  const records = lines.filter(x => x).map(l => {
    const type = l.substring(0, 1);
    const date = l.substring(1, 9);
    const value = l.substring(9, 19);
    const CPF = l.substring(19, 30);
    const cardNumber = l.substring(30, 42);
    const hour = l.substring(42, 48);
    const storeOwner = l.substring(48, 62);
    const storeName = l.substring(62);

    return {
      type: +type,
      createdAt: GMTBrasiltoStandard(date, hour),
      value: +value/100,
      CPF,
      cardNumber,
      storeOwner,
      storeName,
      userId,
    }
  });
  await connection('transaction').insert(records);
}

export async function listCNAB(userId) {
  const records = await connection.select('transaction.*', 'transaction_type.description', 'transaction_type.sign')
    .from('transaction')
    .innerJoin('transaction_type', 'transaction.type', '=', 'transaction_type.id')
    .where('userId', userId)
    .orderBy('storeName', 'asc');
  return _.groupBy(records, 'storeName');
}