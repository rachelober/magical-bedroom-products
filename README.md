# Magical Bedroom Prodicts Catalog

## Installation

### Requirements

  1. npm

### Install dependencies

	$ npm install

### Launch the API

	$ json-server --watch data/db.json

### Launch the server

	$ grunt server

Navigate to [http://localhost:9000/build/index.html]

## Contributing

### Create a pull request

## Testing

We are using Jest test suite to unit test our methods.

### Running the test suite

	$ npm test


1. addCartItem

Runs an Ajax PUT request to add a new item to the cart. Returns the new
cart.

2. calculateCartTotal

Calculates the total price of objects in a cart.

2. fetchCart

Runs an Ajax GET request to fetch all current items in the cart.

4. getCartCount

Calculates how many items are in the cart.

5. priceInt

Helper method to format the price of a cart item so that it can be added
up.

6. removeCartItem

Runs an Ajax DELETE request to delete an item from the cart.

### Linting

... to do!

## To do

## License
