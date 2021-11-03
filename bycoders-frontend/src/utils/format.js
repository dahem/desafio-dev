export function toCurrencyFormat(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export function toDateFormat(value) {
  return new Date(value).toLocaleDateString('pt-BR');
};

export function toDateTimeFormat(value) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Date(value).toLocaleDateString('pt-BR', options);
};
