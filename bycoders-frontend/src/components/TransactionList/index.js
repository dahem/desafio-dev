import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2'
import axios from "axios";
import Button from '../../components/Button';
import { toCurrencyFormat, toDateTimeFormat } from '../../utils/format.js';

function TransactionList() {
  const { getAccessTokenSilently } = useAuth0();
  const [transactionsByShop, setTransactionsByShop] = React.useState({});
  const getTransactions = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.get('/cnab', { headers: { Authorization: `Bearer ${token}` } });
      setTransactionsByShop(res.data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Algo deu errado, verifique os dados do arquivo',
        showConfirmButton: false,
        timer: 5000
      });
    } 
  };

  const calcTotal = (transactions) => {
    let total = 0;
    console.log(transactions);
    transactions.forEach(t => {
       total += t.value * t.sign;
    });
    return total;
  };

  return (
    <div>
      <div style={{ marginTop: '1rem' }} className="center">
        <Button label="Mostrar movimentações por loja" onClick={getTransactions} />
      </div>
      {Object.keys(transactionsByShop).map(shop => (
        <div>
          <div className="center"><h2>Loja: {shop}</h2></div>
          <table className="styled-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Data</th>
                <th scope="col">Valor</th>
                <th scope="col">tipo</th>
                <th scope="col">CPF</th>
                <th scope="col">Cartão</th>
                <th scope="col">Dono da loja</th>
              </tr>
            </thead>
            <tbody>
              {transactionsByShop[shop].map((transaction, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{toDateTimeFormat(transaction.createdAt)}</td>
                  <td style={{ color: transaction.sign > 0 ? 'green' : 'red' }}>{toCurrencyFormat(transaction.sign * transaction.value)}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.CPF}</td>
                  <td>{transaction.cardNumber}</td>
                  <td>{transaction.storeOwner}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right' }}>
            <h2>{'Total: '}  
              <span
                style={{
                  color: calcTotal(transactionsByShop[shop]) > 0 ?
                  'green' : 'red'
                }}
              >
                {toCurrencyFormat(calcTotal(transactionsByShop[shop]))}
              </span>
            </h2>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default TransactionList;