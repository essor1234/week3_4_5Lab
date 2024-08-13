Vue.component('product-details', {
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `,
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    
  })

Vue.component("product-tabs", {
    template: `
    <div>
            <span class="tab" v-for="(tab, index) in tabs" 
            @click= "selectedTab=tab"
            :class="{ activeTab: selectedTab === tab }">
                {{tab}}
            </span>
        </div>
    `,
    data(){
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: "Reviews"
        }
    }
})

Vue.component('product-review', {
    template: `

    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
            <b>Please correct the following error(s)</b>
            <ul>
                <li v-for="error in errors">
                    {{error}}
                </li>
            </ul>
        </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    

    
    </form>
    `,
    data() {
        return{
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review : this.review,
                    rating: this.rating,
                    recommend : this.recommend

    
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null

            }else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")

            }
            
        },
        
        
    }
})

Vue.component("product", {
    
    template: `
    <div class="product">
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image" alt="" style="width: 300px;">
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>

        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out Of Stock</p>
        <p>{{ sale }}</p>


        <p>Shipping Fee: {{shipping}}</p>

        // <ul>
        //     <li v-for="detail in details">{{detail}}</li>
        // </ul>
                <product-details></product-details>



        <div class="color-box"
         v-for="(variant, index) in variants"
          :key="variant.id"
           :style="{backgroundColor: variant.color}"
            @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{disabledButton: !inStock}">Add to Cart</button>

        <button @click="removeFromCart">
            Remove from cart
            </button>
        <product-tabs></product-tabs>
        
        <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
        <p>Recommended: {{ review.recommend }}</p>

          </li>
        </ul>
       </div>
        <product-review @review-submitted="addReview"></product-review>

    </div>
</div>
    </div>
    `,props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return{

        product: 'Socks',
        brand: "QUY",

        // image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg',
        inStock: true,
        selected: 0,
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
        reviews: [],
        onSale: true

    }},
    methods: {
        addToCart: function(){
            // this.cart +=1
            this.$emit('add-to-cart', this.variants[this.selected].id)
        },
        removeFromCart: function(){
            // this.cart +=1
            this.$emit('remove-from-cart', this.variants[this.selected].id)
        },

        updateProduct: function(index){
            this.selected = index
            console.log(index)
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    },
    computed: {
        sale() {
            if (this.onSale) {
              return this.brand + ' ' + this.product + ' are on sale!'
            } 
              return  this.brand + ' ' + this.product + ' are not on sale'
          },
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selected].image
        },
        inStock(){
            return this.variants[this.selected].quantity
        },
        shipping() {
            if(this.premium) {
                return "Free"
            }else {
                return 2.99
            }
        },
        

        
    }

})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],


    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1);
              }
            }
         }
        
    }
    
})