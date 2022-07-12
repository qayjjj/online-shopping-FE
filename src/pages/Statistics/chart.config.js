export const orderValueChartData = (labels, data) => {
  console.log('value', data)
  const result = {
    labels,
    datasets: [
      {
        label: 'Order value',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data,
      },
    ],
  }
  return result
}
export const orderQuantityChartData = (labels, data) => {
  console.log('quantity', data)
  const result = {
    labels,
    datasets: [
      {
        label: 'Order quantity',
        backgroundColor: 'rgb(255, 99, 132)',
        data,
      },
    ],
  }
  return result
}

export const orderValueChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Order Value Summary',
    },
  },
}

export const orderQuantityChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Order Quantity Summary',
    },
  },
}
