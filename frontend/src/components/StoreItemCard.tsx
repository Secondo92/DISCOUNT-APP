import { type SallingDiscounts } from "../types/SallingDiscounts"

type DiscountComponent = {
  discounts: SallingDiscounts[],
  addItemToBasket: (item: SallingDiscounts, storeId: string) => void,
  storeId: string
}

export function StoreItemCard({ discounts, addItemToBasket, storeId }: DiscountComponent) {

  if (!discounts || discounts.length === 0) {
    return <div>No product found</div>;
  }

  return (
    <div className="card-box">
      {discounts.map((discount, index) => (
        <div className="card" key={index}>
          <div className="card-header">
            {discount.product.description}
          </div>

          <div className="card-image-box">
            <img
              src={discount.product.image}
              alt={discount.product.description}
              className="card-image"
            />
          </div>

          <div className="card-price-section">
            <span className="before-price">Før {discount.offer.originalPrice} kr</span>
            <span className="after-price">Nu {discount.offer.newPrice} kr</span>
            <span className="save-price">Spar {discount.offer.discount} kr</span>
          </div>

          <button
            className="card-button"
            onClick={() => addItemToBasket(discount, storeId)}
          >
            Tilføj til kurv
          </button>

        </div>
      ))}
    </div>
  );
}
