const cartID = Number(localStorage.getItem('cartid'))

if (!cartID) {
  alert('You have no products added')
  location.replace('/')
}

const getData = async url => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.length > 0) {
      return data
    }
  } catch (err) {
    console.log(err.message)
    document.querySelector('.subtitle').style.color = 'red'
    document.querySelector('.subtitle').innerHTML = err.message
  }
}

const getInfo = async () => {
  const products = await getData(
    'https://demo-17-vnoq3.ondigitalocean.app/products'
  )
  const cart = await getData(
    `https://demo-17-vnoq3.ondigitalocean.app/cart/${cartID}`
  )

  // console.log(products)
  // console.log(cart)

  // Quantity calculation
  const mapProducts = (cart, products) => {
    return products
      .map(product => ({
        ...product,
        quantity: cart.filter(item => product.id === item).length
      }))
      .filter(product => product.quantity > 0)
  }

  addItems(mapProducts(cart, products))
}

getInfo()

// Add and display items in the cart table
const addItems = async data => {
  const table = document.querySelector('tbody')
  table.innerHTML = ''

  data.forEach(item => {
    const tr = table.insertRow()

    const td1 = tr.insertCell()
    const deleteButton = document.createElement('button')
    td1.append(deleteButton)
    deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    deleteButton.addEventListener('click', async () => {
      const res = await fetch(
        `https://demo-17-vnoq3.ondigitalocean.app/cart/${cartID}/${item.id}`,
        {
          method: 'DELETE'
        }
      )
      const data = await res.json()

      if (data.msg === 'OK') {
        tr.remove()
      }
      console.log(data)
    })

    const td2 = tr.insertCell()
    td2.innerHTML = `<img src="${item.image}"></img>`

    const td3 = tr.insertCell()
    td3.textContent = item.title
    td3.style.fontWeight = 'bold'

    const td4 = tr.insertCell()
    td4.textContent = '€' + item.price

    const td5 = tr.insertCell()
    td5.textContent = item.quantity

    const td6 = tr.insertCell()
    td6.textContent = '€' + item.price * item.quantity
    td6.style.fontWeight = 'bold'
  })
}
