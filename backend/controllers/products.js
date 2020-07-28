const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
  });
  product
    .save()
    .then(createdProduct => {
      res.status(201).json({
        message: "Product added successfully",
        product: {
          ...createdProduct,
          id: createdProduct._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a product failed!"
      });
    });
};

exports.updateProduct = (req, res, next) => {
  Product.updateOne(
    {
      "_id": req.params.id,
    },
    { $set: {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.body.imageUrl
    }})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Couldn't udpate product!"
      });
    });
};

exports.getProducts = (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
  const productQuery = Product.find();
  let fetchedProducts;
  // if (pageSize && currentPage) {
  //   productQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }
  productQuery
    .then(documents => {
      fetchedProducts = documents;
      return Product.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts,
        maxProducts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching products failed!"
      });
    });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching product failed!"
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting products failed!"
      });
    });
};
