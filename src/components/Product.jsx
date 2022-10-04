import useProductStore from '../hooks/useProductStore';

export default function Product() {
  const productStore = useProductStore();

  const { product } = productStore;
  console.log(product);
  return (
    <div>
      <p>Hello, world</p>
      <p>{product.name}</p>
      <p>{product.option}</p>
      <p>{product.price}</p>
      <p>{product.company}</p>
      <p>{product.description}</p>
      <p>
        총 상품금액:
        {product.price * 2}
      </p>
    </div>
  );
}
