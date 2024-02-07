import Customer from "../../models/customers.js";

const getCustomerDashboard = async (req, res) => {
  // retrieve customer_id from req.customer
  const customerId = req.customer;

  console.log(customerId)
  
  // find and fetch from Customer database
  const customerDetails = await Customer.findById(customerId).select("-password").select("-updatedAt");

  if(!customerDetails) {
    return res.status(404).json({message: "No customer found"});
  }

  // respond with customer details
  res.status(200).json(customerDetails);
}

export default getCustomerDashboard;