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
    'https://demo-17-vnoq3.ondigitalocean.app/cart/11224432145'
  )

  // console.log(products)
  console.log(cart)

  // addItems(products)

  const items = products.filter(product => {
    for (let i in cart) {
      if (product.id === cart[i]) {
        return product
      }
    }
  })

  console.log(items)
  addItems(items)
  // addItems(items)

  // Remove product from the cart
  const xBtns = document.querySelectorAll('.fa-xmark')

  xBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let clickedItem = Number(
        e.target.parentElement.parentElement.firstChild.className
      )
      console.log(clickedItem)

      const updatedCart = items.filter(product => {
        if (product.id !== clickedItem) {
          // cart = cart.pop(Number(clickedItem))

          return product
        }
      })
      addItems(updatedCart)
    })
  })
}

getInfo()

const addItems = async data => {
  const table = document.querySelector('tbody')
  table.innerHTML = ''

  data.forEach(item => {
    const tr = table.insertRow()

    const td1 = tr.insertCell()
    td1.className = item.id
    td1.innerHTML = `<i class="fa-solid fa-xmark"></i>`

    const td2 = tr.insertCell()
    td2.innerHTML = `<img src="${item.image}"></img>`

    const td3 = tr.insertCell()
    td3.textContent = item.title
    td3.style.fontWeight = 'bold'

    const td4 = tr.insertCell()
    td4.textContent = '€' + item.price

    const td5 = tr.insertCell()
    td5.textContent = 'quantity'

    const td6 = tr.insertCell()
    td6.textContent = '€' + item.price
    td6.style.fontWeight = 'bold'
  })
}
