export function addToCart(item) {
    return new Promise(async (resolve) => {
      console.log(item)
      const response = await fetch('http://localhost:8080/cart', {
        method:'POST',
        body:JSON.stringify(item),
        headers:{ 'Content-Type':'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    }); 
  }
  
  export function fetchCartByUserId(userId) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/cart/"+userId);
      const data = await response.json();
      resolve({ data });
    });
  }


  export function updateCart(update) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/cart/"+update.id, {
        method:'PATCH',
        body:JSON.stringify(update),
        headers:{ 'Content-Type':'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }

  export function deleteItemFromCart(itemId) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/cart/' + itemId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    });
  }



  export function resetCardAfterOrder(userId) {
    return new Promise(async (resolve) => {
    const response=await fetchCartByUserId(userId);
    const items=response.data;
    for(let item of items){
      await deleteItemFromCart(item.id)
    }
    resolve({ status:'success'});
  });
  }    