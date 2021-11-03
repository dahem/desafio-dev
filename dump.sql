
use db_bycoders;

CREATE TABLE IF NOT EXISTS `transaction_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  `sign` boolean DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

INSERT IGNORE INTO `transaction_type`
    (`id`, `description`, `sign`)
VALUES
    (1, 'Débito', 1),
    (2, 'Boleto', -1),
    (3, 'Financiamento', -1),
    (4, 'Crédito', 1),
    (5, 'Recebimento Empréstimo	', 1),
    (6, 'Vendas', 1),
    (7, 'Recebimento TED	', 1),
    (8, 'Recebimento DOC	', 1),
    (9, 'Aluguel', -1);
    
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `value` double NOT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `cardNumber` varchar(12) DEFAULT NULL,
  `storeOwner`varchar(14) DEFAULT NULL,
  `storeName`varchar(19) DEFAULT NULL,
  `userId` varchar(100) DEFAULT NULL,	
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`type`) REFERENCES transaction_type(id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

