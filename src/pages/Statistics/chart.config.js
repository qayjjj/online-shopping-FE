export const orderValueChartData = (labels, data) => {
  console.log('value', data)
  const result = {
    labels,
    datasets: [
      {
        label: 'Order value',
        backgroundColor: '#6c63ff',
        borderColor: '#6c63ff',
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
        backgroundColor: '#6c63ff',
        data,
      },
    ],
  }
  return result
}

export const orderValueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Order Value Summary',
    },
  },
}

export const orderQuantityChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Order Quantity Summary',
    },
  },
}
