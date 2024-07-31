import { Avatar, Card, Chip, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import Pagination from "../components/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
const TABLE_HEAD = [
  "ID",
  "OrderedProducts",
  "Shipping Address",
  "Order Date",
  "Total",
  "Status",
];

export default function Order() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await userService.getOrder();
        setOrders(orders.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);
  if (!orders) {
    return <Loading />;
  }
  if (orders?.length === 0) {
    return (
      <div className="container mx-auto mt-4 flex flex-col">
        <Typography variant="h4" className="m-3">
          MY ORDERS
        </Typography>
        <Card className="container mx-auto mt-3 min-h-96">
          <Typography variant="h6" color="blue-gray" className="text-center">
            You have no orders yet.
            <Typography className="text-base">
              You have not placed any orders yet,
              <Link to="/" className="text-[#007BFF]">
                {" "}
                start adding some
              </Link>
              !
            </Typography>
          </Typography>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <Typography variant="h4" className="m-3">
        MY ORDERS
      </Typography>
      <Card className="container mx-auto mt-3">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={order.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
          {/* {order.orderDetails.map((item) => {
              return (
                <div key={item.id} className="order-item flex items-center py-2">
                 <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="product-image w-10 h-10 object-cover me-5"
                />
                  <span className="product-name font-bold text-medium me-5">
                     {item.product.name}
                  </span>
                  <span className="product-quantity text-gray-700 text-sm">
                    Quantity x{item.quantity}
                  </span>
                </div>
              );
          })} */}
  {order.orderDetails?.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemPrefix>
                      <Avatar
                        variant="circular"
                        alt="candice"
                        src={item.product.image}
                      />
                    </ListItemPrefix>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {item.quantity} x{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.product.price)}
                        ={" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.quantity * item.product.price)}
                      </Typography>
                    </div>
                  </ListItem>
                ))}

                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(order.orderDate).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.total)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={order.status}
                      color={
                        order.status === "processing"
                          ? "green"
                          : order.status === "pending"
                          ? "amber"
                          : order.status === "shipped"
                          ? "teal"
                          : "red"
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
