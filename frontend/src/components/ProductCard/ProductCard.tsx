import { formatPrice } from '../../utils/formatPrice';
import type { Product } from '../../data/products';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, size, price, image } = product;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={image}
          alt={name}
          width={800}
          height={800}
          loading="lazy"
          className="product-card__image"
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__size">{size}</p>
        <p className="product-card__price tabular">{formatPrice(price)}</p>
      </div>
    </article>
  );
}
