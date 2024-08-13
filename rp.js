var app = new Vue({
    el: '#app',
    data: {
        product: "Laptop",
        description: 'A pair of warm fuzzy socks',
        // QUy

        image: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',

        inStock: false,
        onSale: true,

        details: ["80% contton", "20% sausage", "MADE by QUY"],
        variants: [{
            id:1,
            color: "green",
            image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            quantity: 10,

        },
        {
            id:2,
            color: "blue",
            image: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            quantity: 0,

            
            
        }],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart:0,


    },
    methods: {
        addToCart(){
            this.cart +=1
        },
        
        removeFromCart() {
        this.cart -= 1
        },
        updateProduct(img){
            this.image = img
        }
    }
})