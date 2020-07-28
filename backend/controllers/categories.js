const Category = require("../models/category");



exports.getCategories = (req, res, next) => {
  const categoryQuery = Category.find().sort({category : 1});
  let fetchedCategories;
  categoryQuery
    .then(documents => {
      fetchedCategories = documents;
      return Category.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Categories fetched successfully!",
        categories: fetchedCategories,
        maxCategories: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching categories failed!"
      });
    });
};



