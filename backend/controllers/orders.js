// to be finished
// const Order = require("../models/order");

// exports.createOrder = (req, res, next) => {
//   const order = new Order({
//     title: req.body.title,
//     price: req.body.price,
//     category: req.body.category,
//     imageUrl: req.body.imageUrl,
//   });
//   order
//     .save()
//     .then(createdOrder => {
//       res.status(201).json({
//         message: "Order added successfully",
//         order: {
//           ...createdOrder,
//           id: createdOrder._id
//         }
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Creating a order failed!"
//       });
//     });
// };

// exports.getOrders = (req, res, next) => {
//   // const pageSize = +req.query.pagesize;
//   // const currentPage = +req.query.page;
//   const orderQuery = Order.find();
//   let fetchedOrders;
//   // if (pageSize && currentPage) {
//   //   orderQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   // }
//   orderQuery
//     .then(documents => {
//       fetchedOrders = documents;
//       return Order.count();
//     })
//     .then(count => {
//       res.status(200).json({
//         message: "Orders fetched successfully!",
//         orders: fetchedOrders,
//         maxOrders: count
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching orders failed!"
//       });
//     });
// };

// exports.getOrder = (req, res, next) => {
//   Order.findById(req.params.id)
//     .then(order => {
//       if (order) {
//         res.status(200).json(order);
//       } else {
//         res.status(404).json({ message: "Order not found!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching order failed!"
//       });
//     });
// };
