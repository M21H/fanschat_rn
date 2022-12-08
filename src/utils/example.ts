export const calcPagesCont = (perPage: number, totalCount: number): number => {
  return totalCount < perPage ? 1 : Math.ceil(totalCount / perPage);
};
