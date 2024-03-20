export function fetchProductsByFilterSortPagination({
  sort: { sortBy, order },
  filter,
  pagination: { _page, _limit },
  admin
}) {
  return new Promise(async (resolve) => {
    let query = "";
    //yaha pe array of obj handle karra hu
    //TODO on server support multivalue in filter nand server will filter deletd products incase of admin 

    for (let i in filter) {
      for (let key in filter[i]) {
        query += `${key}=${filter[i][key]}&`;
      }
    }

    const response = await fetch(
      `http://localhost:8080/products?_sort=${sortBy}&_order=${order}&` +
        query +
        `_page=${_page}&_limit=${_limit}&isAdmin=${admin || false}`
    );
    const data = await response.json();
    const totalItemsCount =  response.headers.get('x-total-count'); //ye header apne aap dega handle it in backend
    resolve({ data: { products: data, totalItems: +totalItemsCount } });
  });
}


export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}


export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products",{
      method:'POST',
      body:JSON.stringify(product),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({ data });
  });
}


export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+update.id, {
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{ 'Content-Type':'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
