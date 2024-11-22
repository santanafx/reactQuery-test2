export const getProducts = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return [
    {
      id: 1,
      name: "Product 1",
      price: 10,
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
    },
    {
      id: 3,
      name: "Product 3",
      price: 13,
    },
    {
      id: 4,
      name: "Product 4",
      price: 40,
    },
    {
      id: 5,
      name: "Product 5",
      price: 65,
    },
  ];
};

export const createProduct = async (_: any) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });

  return;
};
