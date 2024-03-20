export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}



export function fetchAllOrders({
  sort,
  // filter,
  pagination: { _page, _limit },
}) {
  return new Promise(async (resolve) => {
    // let query = "";
    // for (let i in filter) {
    //   for (let key in filter[i]) {
    //     query += `${key}=${filter[i][key]}&`;
    //   }
    // }

    // const response = await fetch(
    //   `http://localhost:8080/orders?_sort=${sortBy}&_order=${order}&` +
    //     query +
    //     `_page=${_page}&_limit=${_limit}`
    // );
    const response = await fetch(
        `http://localhost:8080/orders`
      );

    // const response = await fetch(
    //   `http://localhost:8080/orders?_sort=${sort._sort}&_order=${sort._order}&_page=${_page}&_limit=${_limit}`
    // );
    // console.log(`http://localhost:8080/orders?_sort=${_sort}&_order=${_order}&_page=${_page}&_limit=${_limit}`);
    const dataOfOrders = await response.json();
    const totalItems = await response.headers.get("X-Total-Count"); //ye header apne aap dega handle it in backend
    resolve({ data: { orders: dataOfOrders, totalOrders: +totalItems } });
  });
}
