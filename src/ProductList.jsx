import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Natural humidifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to grow indoor plant.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/08/aloe-vera-3284620_1280.jpg", description: "Medicinal and purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Houseplants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/21/58/lavender-829623_1280.jpg", description: "Calming aroma.", cost: "$22" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2016/08/28/23/39/jasmine-1627138_1280.jpg", description: "Sweet fragrance.", cost: "$19" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herb fragrance.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/18/16/mint-1163013_1280.jpg", description: "Fresh smell for kitchen.", cost: "$11" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/08/14/14/16/eucalyptus-3605679_1280.jpg", description: "Soothing menthol scent.", cost: "$17" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/28/12/32/lemon-balm-2350882_1280.jpg", description: "Citrus aromatic leaves.", cost: "$13" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/01/29/14/41/zz-plant-5961226_1280.jpg", description: "Thrives on neglect.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816913_1280.jpg", description: "Tolerates low light.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/05/17/12/40/plant-5181518_1280.jpg", description: "Extremely durable.", cost: "$20" },
        { name: "Succulent Trio", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/succulents-1846147_1280.jpg", description: "Requires minimal water.", cost: "$16" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2017/02/07/16/47/succulent-2046462_1280.jpg", description: "Symbol of good luck.", cost: "$18" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/chinese-evergreen-5939188_1280.jpg", description: "Adapts to poor light.", cost: "$21" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={onHomeClick}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <button onClick={onHomeClick}>Home</button>
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)} className="cart-btn">
            🛒 Cart <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plant-grid">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-desc">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] ? 'disabled' : ''}`}
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
