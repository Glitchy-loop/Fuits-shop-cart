let cartId = Number(localStorage.getItem('cartId'))

if (!cartId) {
  cartId = Math.floor(Math.random() * 100000) + 1
  localStorage.setItem('cartid', cartId)
}

const getData = async url => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const addItems = items => {
  const productsContainer = document.querySelector('.products')
  productsContainer.innerHTML = ''

  items.forEach(item => {
    const productBlock = document.createElement('div')
    productBlock.className = 'product'
    productBlock.classList.add('product-' + item.id)

    const imageBlock = document.createElement('div')
    imageBlock.className = 'image'
    const img = document.createElement('img')
    img.src = item.image
    imageBlock.append(img)

    const title = document.createElement('div')
    title.className = 'title'
    title.textContent = item.title

    const rating = document.createElement('div')
    rating.className = 'rating'
    rating.textContent = '*'.repeat(item.rating)

    const price = document.createElement('div')
    price.className = 'price'
    price.textContent = '€' + item.price

    const addToCart = document.createElement('button')
    addToCart.className = 'addToCart'
    addToCart.textContent = 'Add to cart'

    productBlock.prepend(imageBlock, title, rating, price, addToCart)
    productsContainer.append(productBlock)
  })
  const addToCartBtns = document.querySelectorAll('.addToCart')

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
      let fruitProductId = Number(e.target.parentElement.className.slice(16))

      // console.log(fruitProductId)

      const res = await fetch('https://demo-17-vnoq3.ondigitalocean.app/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          randomId: cartId,
          productId: fruitProductId
        })
      })
      const data = await res.json()
      return console.log(data)
    })
  })
}

const displayRatings = async () => {
  const products = await getData(
    'https://demo-17-vnoq3.ondigitalocean.app/products'
  )
  const ratings = await getData(
    'https://demo-17-vnoq3.ondigitalocean.app/ratings'
  )

  const items = products.map(product => {
    const custRatings = ratings.filter(
      rating => rating.productId === product.id
    )
    const total = custRatings.reduce((acc, value) => acc + value.rating, 0)
    return {
      ...product,
      rating: Math.round(total / custRatings.length)
    }
  })

  addItems(items)
}

displayRatings()
