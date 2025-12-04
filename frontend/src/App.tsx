import './index.css'
import { useState, useEffect } from 'react'
import StoreSelector from './components/StoreSelector'
import { fetchDiscounts } from './api/fetchDiscount'
import { fetchStores } from './api/fetchStores'
import { type SallingStore } from './types/SallingStore'
import { type SallingDiscounts } from './types/SallingDiscounts'
import { StoreItemCard } from './components/StoreItemCard'
import StoreSearchSelect from './components/StoreSearchSelect'

function App() {
  const [stores, setStores] = useState<SallingStore[]>([]);
  const [selected, setSelected] = useState<SallingStore | undefined>(undefined);
  const [discounts, setDiscount] = useState<SallingDiscounts[]>([])
  const [search, setSearch] = useState("")
  const [items, setItems] = useState<
    Map<string, { quantity: number, discount: number, price: number, storeId: string }>
  >(new Map())

  function addItemToBasket(item: SallingDiscounts, storeId: string) {
    const cart = new Map(items);
    const itemPrice = item.offer.newPrice;
    const itemDiscount = item.offer.discount;
    const itemName = item.product.description;
    const existing = cart.get(itemName)

    if (existing) {
      cart.set(itemName, {
        quantity: existing.quantity + 1,
        discount: existing.discount,
        price: existing.price + itemPrice,
        storeId: existing.storeId
      })
    } else {
      cart.set(itemName, {
        quantity: 1,
        discount: itemDiscount,
        price: itemPrice,
        storeId: storeId
      })
    }

    setItems(cart);
  }

  function incrementItem(name: string) {
    const cart = new Map(items);
    const existing = cart.get(name);
    if (!existing) return;

    const unit = existing.price / existing.quantity;

    cart.set(name, {
      ...existing,
      quantity: existing.quantity + 1,
      price: existing.price + unit
    });

    setItems(cart);
  }

  function decrementItem(name: string) {
    const cart = new Map(items);
    const existing = cart.get(name);
    if (!existing) return;

    const unit = existing.price / existing.quantity;

    if (existing.quantity === 1) {
      cart.delete(name);
    } else {
      cart.set(name, {
        ...existing,
        quantity: existing.quantity - 1,
        price: existing.price - unit
      });
    }

    setItems(cart);
  }

  function removeItem(name: string) {
    const cart = new Map(items);
    cart.delete(name);
    setItems(cart);
  }

  function clearCart() {
    setItems(new Map());
  }

  const itemsByStore = new Map<string, Array<[string, any]>>();
  items.forEach((value, key) => {
    if (!itemsByStore.has(value.storeId)) {
      itemsByStore.set(value.storeId, []);
    }
    itemsByStore.get(value.storeId)!.push([key, value]);
  });

  let totalPrice = 0;
  let totalDiscount = 0;

  items.forEach(item => {
    totalPrice += item.price;
    totalDiscount += item.discount * item.quantity;
  });

  const filteredItems = discounts.filter(discount =>
    discount.product.description.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    async function loadStores() {
      const fetchedstores = await fetchStores();
      setStores(fetchedstores);
      setSelected(fetchedstores[0]);
    }
    loadStores();
  }, []);

  useEffect(() => {
    async function loadDiscounts() {
      if (selected) {
        const fetchedDiscounts = await fetchDiscounts(selected?.id)
        setDiscount(fetchedDiscounts?.clearances ?? [])
      }
    }
    loadDiscounts();
  }, [selected]);

  return (
    <div className='page-layout'>
      <aside className='sidebar'>
        <div className='sidebar-box'>

          <StoreSearchSelect
            stores={stores}
            selected={selected}
            onChange={setSelected}
          />

          <div className='searchbar'>
            <input
              type="text"
              className="input search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Søg produkter…"
            />
          </div>

          <div className="cart-box">
            <h3 className="cart-title">Din kurv</h3>

            {Array.from(itemsByStore.entries()).map(([storeId, storeItems], index) => (
              <div key={storeId} className={index % 2 === 0 ? "store-group-light" : "store-group-dark"}>
                <h4>
                  🏪 {stores.find(s => s.id === storeId)?.name ?? "Ukendt butik"}
                </h4>

                {storeItems.map(([name, value]) => (
                  <div className="cart-item" key={name}>
                    <span className="cart-qty">{value.quantity}x</span>

                    <span className="cart-name">{name}</span>

                    <div className="cart-controls">
                      <button className="cart-btn" onClick={() => decrementItem(name)}>-</button>
                      <button className="cart-btn" onClick={() => incrementItem(name)}>+</button>
                      <button className="cart-btn remove-btn" onClick={() => removeItem(name)}>Fjern</button>
                    </div>

                    <span className="cart-price">{value.price.toFixed(2)} kr</span>
                  </div>

                ))}
              </div>
            ))}

            <div className="cart-summary">
              {totalPrice > 0 && (
                <p>Total: {totalPrice.toFixed(2)} kr</p>
              )}
              {totalPrice > 0 && (
                <p>Besparelse: {totalDiscount.toFixed(2)} kr</p>
              )}

              {items.size > 0 && (
                <button onClick={clearCart}>Ryd kurv</button>
              )}
            </div>

          </div>
        </div>
      </aside>

      <main className='content-area'>
        {selected && (
          <StoreItemCard
            discounts={filteredItems}
            addItemToBasket={addItemToBasket}
            storeId={selected.id}
          />
        )}
      </main>
    </div>
  )
}

export default App
