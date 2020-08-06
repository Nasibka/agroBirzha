// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################


function createData(cost, amount, total) {
  return { cost, amount, total };
}
function createBid(code,cost,volume,change,name) {
  return { code,cost,volume,change,name };
}
export const saleList = [
  createData(1023.323, 3238.7263, 1324171354),
  createData(2341.342, 959.6961, 1403500365),
  createData(341.654, 30.1340, 60483973),
  createData(412.348, 983.3520, 327167434),
  createData(83, 998.4670, 37602103),
  createData(926.49, 769.2024, 25475400),
  createData(735.46, 357.578, 83019200),
  createData(900.97, 70.273, 4857000),
  createData(342.8, 197.2550, 126577691),
  createData(553.924, 377.973, 126317000),
  createData(998.541, 64.0679, 67022000),
  createData(1638.4, 242.495, 67545757),
  createData(2043.435, 170.98246, 146793744),
  createData(462.5, 92.3768, 200962417),
  createData(897.34, 85.15767, 210147125),
  createData(998.541, 64.0679, 67022000),
  createData(1638.4, 242.495, 67545757),
  createData(2043.435, 170.98246, 146793744),
  createData(462.5, 92.3768, 200962417),
  createData(897.34, 85.15767, 210147125),
  createData(1638.4, 242.495, 67545757),
  createData(2043.435, 170.98246, 146793744),
  createData(462.5, 92.3768, 200962417),
  createData(897.34, 85.15767, 210147125),
  createData(1023.323, 3238.7263, 1324171354),
];
export const buyList = [
  createData(735.46, 357.578, 83019200),
  createData(900.97, 70.273, 4857000),
  createData(342.8, 197.2550, 126577691),
  createData(553.924, 377.973, 126317000),
  createData(998.541, 64.0679, 67022000),
  createData(1638.4, 242.495, 67545757),
  createData(2043.435, 170.98246, 146793744),
  createData(462.5, 92.3768, 200962417),
  createData(897.34, 85.15767, 210147125),
  createData(1023.323, 3238.7263, 1324171354),
  createData(2341.342, 959.6961, 1403500365),
  createData(341.654, 30.1340, 60483973),
  createData(412.348, 983.3520, 327167434),
  createData(83, 998.4670, 37602103),
  createData(926.49, 769.2024, 25475400),
  createData(998.541, 64.0679, 67022000),
  createData(1638.4, 242.495, 67545757),
  createData(2043.435, 170.98246, 146793744),
  createData(462.5, 92.3768, 200962417),
  createData(897.34, 85.15767, 210147125),
  createData(1638.4, 242.495, 67545757),
  createData(2043.435, 170.98246, 146793744),
  createData(462.5, 92.3768, 200962417),
  createData(897.34, 85.15767, 210147125),
  createData(1023.323, 3238.7263, 1324171354),

];
export var bidList = [
  createBid('MLD',214.3,4123683,'+32.3','Картофель Молодой'),
  createBid('CHR',33.4,92384782,'-53.2','Помидоры Черри'),
  createBid('GLL',74.23,57384638,'+2.4','Картофель Голландский'),
  createBid('ONI',129.342,472492,'+41.2','Лук'),
  createBid('CAR',85.9,5324817,'-12.34','Морковь'),
  createBid('BEF',214.3,4123683,'+32.3','Говядина'),
  createBid('HRS',33.4,92384782,'-53.2','Конина'),
  createBid('CHI',74.23,57384638,'+2.4','Курица'),
  createBid('WTM',129.342,472492,'+41.2','Арбуз'),
  createBid('MLN',85.9,5324817,'-12.34','Дыня'),
  createBid('CRN',214.3,4123683,'+32.3','Кукуруза'),
]

// module.exports = {
//   saleList,
//   buyList,
//   bidList,
//   website,
//   server,
// };
