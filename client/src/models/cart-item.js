class CartItem {
    constructor (id, productId, imageUrl, title, description, color, quantity, price) {
        this.id = id;
        this.productId = productId;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        
        this.color = color;
        this.quantity = quantity;
        this.price = price;
    }
}


export default CartItem;