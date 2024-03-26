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
export function fetchAllProductByFilter(filter) {

  let queryString = '';
  for (const key in filter) {
    queryString += `${key}=${filter[key]}&`
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard code the server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json()
    resolve({data})
  }    
  );
}
