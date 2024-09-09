import iphone13 from './assets/iphone_13.png'
import iphone14 from './assets/iphone_14.png'
import iphone15 from './assets/iphone_15.png'
import iphone15_pro from './assets/iphone_15_pro.png'


import { useState, useEffect } from 'react'


function Cart() {

    const product = [
        {
            id: 1,
            img: iphone13,
            name: "iPhone 13",
            para: "All kinds of awesome.",
            price: 599,
        },
        {
            id: 2,
            img: iphone14,
            name: "iPhone 14",
            para: "As amazing as ever.",
            price: 699,
        },
        {
            id: 3,
            img: iphone15,
            name: "iPhone 15",
            para: "A total powerhouse.",
            price: 799,
        },
        {
            id: 4,
            img: iphone15_pro,
            name: "iPhone 15 Pro",
            para: "The ultimate iPhone.",
            price: 999,
        },
        {
            id: 5,
            img: iphone14,
            name: "iPhone 14",
            para: "As amazing as ever.",
            price: 699,
        },
        {
            id: 6,
            img: iphone15,
            name: "iPhone 15",
            para: "A total powerhouse.",
            price: 799,
        },
        
        
    ]




    
    // const addToCart = (item) =>{
    //     setCart([...cart, item])
    // }
    
    // const removeFromCart = (product) => {
    //     setCart(cart.filter(item => item.id !== product.id) )
    //   }


    // localStorage-დან მონაცემების წამოღება
    const getLocalStorageCart = () => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    const [cart, setCart] = useState(getLocalStorageCart())
    const clear = () =>{
        setCart([])
    }


    // ყოველი ცვლილების შემდეგ კალათის მონაცემების შენახვა localStorage-ში
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const addToCart = (product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find(item => item.id === product.id);

          if (existingProduct) {
            return prevCart.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        
    });
    };
    const removeFromCart = (product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find(item => item.name === product.name);
          if (existingProduct.quantity > 1) {
            return prevCart.map(item =>
              item.name === product.name
                ? { ...item, quantity: item.quantity - 1  }
                : item
            );
          } else {
            return prevCart.filter(item => item.name !== product.name);
          }
        });
    };
    const removeFromCartAll = (product) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== product.id));

    };


    const getTotal = () =>{
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }


    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }; 



    return (
        <div className='main__content'>
            <div className='cart__lineup'>
                <div className='head__line'>
                    <h1>Explore the lineup.</h1>
                    <div onClick={toggleMenu} className="cart__icon">
                        <p className='cart__len'>{cart.length}</p>
                        <ion-icon className="icon" name="cart-outline"></ion-icon>
                    </div>
                </div>
                <div className="lineup">
                    {
                        product.map((product) => (
                            <div className='lineup__item' key={product.id}>
                                <img src={product.img} alt="" />
                                <h2>{product.name}</h2>
                                <p>{product.para}</p>
                                <div className='price'>{product.price} USD</div>

                                <button className='btn' onClick={() => addToCart(product)}>Buy</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={isOpen ? " active " : " cart"}>
                <div onClick={toggleMenu} className='close'>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className='cart__head'>
                    <h3>Cart</h3>
                    <div onClick={clear}>Delete All</div>
                </div>

                {
                    cart.length > 0 ? (

                        <div>

                            
                            <div className='cart__items'>
                                {
                                    cart.map((item => (
                                        <div className='cart__product__details' key={item.id}>
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p className='cart__product__details__p'>{item.price * item.quantity} USD</p>
                                            </div>
                                            <div className='quentity'>
                                                <button className='q__btn' onClick={() => removeFromCart(item)}>-</button>
                                                <p>{item.quantity}</p>
                                                <button className='q__btn' onClick={() => addToCart(item)}>+</button>
                                            </div>
                                            <button className='cart__btn' onClick={() => removeFromCartAll(item)}>&#10005;</button>
                                        </div>
                                    )))
                                }
                            </div>
                        </div>
                    ) : (
                        <p className='empty'>cart is empty</p>
                    )
                }

                <div className='total'>
                    <h5>All: {getTotal()} USD</h5>
                    <button className='btn'> Buy</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
