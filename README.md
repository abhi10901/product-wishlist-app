# product-wishlist-app

APIs:

1) Get All Users into the System
Request:
    uri: /api/users
    methodType: GET

Response: 
    status code: 200,
    response body: {
        users: [{
            _id: user_object_id,
            name: user_name
        },...]
    }
    
---------------------------------------------------------------
2) Get User By Id: change user_id with actual user_id

Request:
    uri: /api/users/user_id
    methodType: GET

Response: 
    status code: 200,
    response body: {
        _id: user_object_id,
        name: user_name
    }

---------------------------------------------------------------
3) Create new User

Request:
    uri: /api/users
    methodType: POST,
    Content-Type: "application/json",
    body: {
        user: {
            name: USER_NAME
        }
    }

Response: 
    status code: 201,
    response body: {
        _id: user_object_id,
        name: USER_NAME
    }

---------------------------------------------------------------
4) Get All Products into the System
Request:
    uri: /api/products
    methodType: GET

Response: 
    status code: 200,
    response body: {
        products: [{
            _id: product_object_id,
            name: product_name,
            size: product_size,
            price: product_price,
            quantity: product_quantity,
            productId: product_id.
            stock_status: product_status
        },...]
    }

---------------------------------------------------------------
5) Get Product By Id: change user_id with actual product_id

Request:
    uri: /api/products/product_id
    methodType: GET

Response: 
    status code: 200,
    response body: {
        _id: product_object_id,
        name: product_name,
        size: product_size,
        price: product_price,
        quantity: product_quantity,
        productId: product_id.
        stock_status: product_status
    }

---------------------------------------------------------------
6) Create new Product

Request:
    uri: /api/products
    methodType: POST,
    Content-Type: "application/json",
    body: {
        product: {
            name: product_name,
            size: product_size,
            price: product_price,
            quantity: product_quantity,
            productId: product_id.
            stock_status: product_status
        }
    }

Response: 
    status code: 201,
    response body: {
        _id: product_object_id,
        name: product_name,
        size: product_size,
        price: product_price,
        quantity: product_quantity,
        productId: product_id.
        stock_status: product_status
    }

---------------------------------------------------------------
7) Get User Wishlist for provided user_id

Request:
    uri: /api/users/user_id/wishlist
    methodType: GET

Response: 
    status code: 200,
    response body:{
        _id: user_object_id,
        name: user_name,
        wishlist: [{
            _id: product_object_id,
            name: product_name,
            size: product_size,
            price: product_price,
            quantity: product_quantity,
            productId: product_id.
            stock_status: product_status
        },...]
    } 

---------------------------------------------------------------
8) Add product to the User wishlist

Request:
    uri: /api/users/user_id/wishlist
    methodType: POST,
    request_body: {
        productId: product_object_id
    }

Response: 
    status code: 200,
    response body:{
        message: "Product added to the wishlist"
        user: {
            _id: user_object_id,
            name: user_name,
            wishlist: [product_id,...]
        }
    } 