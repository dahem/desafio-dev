/* input: 20190301 (yyytmmdd) 172712 (HH:mm:ss) GMT-3*/
/* output: 2019-03-01T20:27:12.000Z (Date) */
export function GMTBrasiltoStandard(date, time) {
  const dateStr = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}T${time.substring(0,2)}:${time.substring(2,4)}:${time.substring(4,6)}.000Z`;
  return new Date(new Date(dateStr).getTime() + 3 * 60 * 60 * 1000);
}