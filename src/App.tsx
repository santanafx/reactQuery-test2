import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createProduct, getProducts } from "./products";

function App() {
  const queryClient = useQueryClient();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data, variables, context) => {
      const cached = queryClient.getQueryData(["products"]);
      console.log(cached);

      queryClient.setQueryData(["products"], (data) => {
        return [
          ...data,
          {
            id: crypto.randomUUID(),
            name: variables.name,
            price: variables.price,
          },
        ];
      });
    },
  });

  const handleCreateProduct = async () => {
    try {
      await createProductFn({
        name: productName,
        price: productPrice,
      });
      alert("Product created");
    } catch (err) {
      alert("Error creating product");
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          width: "400px",
          marginBottom: "50px",
        }}
      >
        <input
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button onClick={handleCreateProduct}>Create product</button>
      </div>
      {products?.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
