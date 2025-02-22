import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCardAfterOrderAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
  const dispatch=useDispatch();
    const orderId=useParams().id;
    const loggedInUser=useSelector(selectLoggedInUser)
    useEffect(()=>{
      // reset cart
      dispatch(resetCardAfterOrderAsync(loggedInUser.id));

      // reset currentorder
      dispatch(resetOrder())
    },[dispatch,loggedInUser])

  return (
    <>
      {" "}
      {!orderId && <Navigate to="/" replace="true"></Navigate>}
      <div>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">
              Order Placed Successfully
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Number is #{orderId}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can Track your Order in My account! Thank You for Shopping
              With Us!!!!!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default OrderSuccessPage;
