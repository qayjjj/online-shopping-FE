export const orderChartData = (labels, data) => {
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

export const orderChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Order summary',
    },
  },
}
