# Magical Bedroom Prodicts Catalog

An experiment with a single one-page app! Includes Jest tests for
JavaScript built using babel, browserify, and nunjucks.

Uses Sass for CSS precompilation.

Uses json-server for the dummy API.

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

Copyright (c) 2016 Rachel Ober

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
