const cartItem = {
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <div><b>Количество</b>: ${good.quantity}</div>
                    <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
                </div>`;
    }
}


const cart = {
    cartListBlock: null,
    cartButton: null,
    cartItem,   
    catalog: [
        {
            id_product: 123,
            product_name: 'Ноутбук',
            price: 45600,
            quantity: 1,
        },
        {
            id_product: 456,
            product_name: 'Мышка',
            price: 1000,
            quantity: 2,
        },
        {
            id_product: 305,
            product_name: 'Клавиатура',
            price: 2000,
            quantity: 1,
        },
    ],
    goods: [
        // {
        //     id_product: 123,
        //     product_name: 'Ноутбук',
        //     price: 45600,
        //     quantity: 1,
        // },
        // {
        //     id_product: 456,
        //     product_name: 'Мышка',
        //     price: 1000,
        //     quantity: 2,
        // },
        // {
        //     id_product: 305,
        //     product_name: 'Клавиатура',
        //     price: 2000,
        //     quantity: 1,
        // },
    ],

    initcat() {
        this.cartListBlock = document.querySelector('.catalog');
        this.rendercat();
    },
    initcart() {
        this.cartListBlock = document.querySelector('.cart-list');
        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));
        this.rendercart();
    },
    rendercat() {
        if (this.catalog.length) {
            this.catalog.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(good));
                this.cartListBlock.insertAdjacentHTML('beforeend', '<button class= addToCart>Add</button>');
                let click = function () { this.addToCart({...good}); };
                this.cartListBlock.lastChild.addEventListener('click', click.bind(this));

            });
        }
    },
    rendercart() {
        if (this.goods.length) {
            this.goods.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(good));
            });
        this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.goods.length} позиций(я) стоимостью ${this.getCartPrice()}`);
    } else {
        this.cartListBlock.textContent = 'Корзина пуста';
    }
    },
    addToCart(item) {
        console.log(item.quantity);
        let flag = false;
        this.goods.forEach(cartItem => {
            
            if (cartItem.id_product == item.id_product){ 
                cartItem.quantity = item.quantity + cartItem.quantity;
                flag = true;
            }
        })
        if (!flag) cart.goods.push(item);
        
        this.cartListBlock.innerHTML = "";
        this.rendercart();
        
    },
    getCartPrice() {
        return this.goods.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },
    clearCart() {
        this.goods = [];
        this.rendercart();
    },
};

cart.initcat()
cart.initcart()



