// // Get products
// const getData = async () => {
//   try {
//     const res = await fetch('https://demo-17-vnoq3.ondigitalocean.app/products')
//     const data = await res.json()

//     if (data.length > 0) {
//       const sortedData = sortProductsByPrice(data)
//     }
//   } catch (err) {
//     console.log(err.message)
//   }
//   //   console.log(data)
//   // console.log(sortedData)
// }

// // Sort products by price
// const sortProductsByPrice = data => {
//   return data.sort((a, b) => a.price - b.price)
// }

// getData()

// Get titles of products

const getProducts = async () => {
  const products = await fetch(
    'https://demo-17-vnoq3.ondigitalocean.app/products'
  )
  const data = await products.json()
  // console.log(data)
  return data
}

getProducts().then(data => {
  const titles = data.map(product => {
    return product.title
  })

  const prices = data.map(product => {
    return product.price
  })

  // console.log(prices)
  myChart.config.data.labels = titles
  // console.log(myChart.config.data.datasets[0].data)
  myChart.config.data.datasets[0].data = prices

  myChart.update()
})

// CHART

const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Products by price in EUR',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45]
    }
  ]
}

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  }
}
const myChart = new Chart(document.getElementById('myChart'), config)
