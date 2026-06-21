
export const isNewProduct = (createdAt: string) => {
  const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

  return (
    Date.now() - new Date(createdAt).getTime()
    < FOURTEEN_DAYS
  );
};

export const getTotalStock = (product: any) => {
  return (
    product?.variants?.reduce((sum: number, v: any) => {
      return sum + (v?.stock || 0);
    }, 0) || 0
  );
};