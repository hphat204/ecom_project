export const getProducts = async () => {
  const reponse = await fetch(`https://fakestoreapi.com/products`);
  if (!reponse.ok) {
    throw new Error({ message: "fail to fetch products", status: reponse.status });
  }
  return reponse;
};

export const getProductDetails = async (id) => {
  const reponse = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!reponse.ok) {
    throw { message: "fail to fetch product", status: reponse.status };
  }
  return reponse;
};
