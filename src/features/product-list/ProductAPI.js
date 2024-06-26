// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard code the server URL here
    const response = await fetch(`http://localhost:8080/products`)
    const data = await response.json()
    resolve({data})
  }    
  );
}
export function fetchAllProductByFilter(filter,sort, pagination) {
  // filter = {"category": ["smartphone", "laptops"]}
  //sort = {_sort:"price",_order="desc"}
  //pagination = {_page=1, _limit=10}
  let queryString = '';
  for (const key in filter) {
    const categoryValues = filter[key];
    if(categoryValues.length > 0){
      const lastCategoryValue = categoryValues(categoryValues.length-1);
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard code the server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total_count');
    resolve({data:{products:data, totalItems: +totalItems}
    })
    console.log(totalItems)
  }    
  );
}




export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/categories`)
    const data = await response.json()
    resolve({data})
  }    
  );
}




export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/brands`)
    const data = await response.json()
    resolve({data})
  }    
  );
}




export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/`+id)
    const data = await response.json()
    resolve({data})
  }    
  );
}


export function createProduct(product){
 return new Promise(async(resolve) => {
  const response = await fetch('http://localhost:8080/products/',{
    method: 'POST',
    body: JSON.stringify(product),
    headers: {'content-type': 'application/json'}
  })
  const data = await response.json();
  resolve({data})
 })
}

export function updateProduct(update){
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+ update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json();
    resolve({data})
  })
}