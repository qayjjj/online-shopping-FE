import React, { useEffect, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getAllOrders } from '../../services/order.service'
import { Button, TextField } from '@mui/material'
import isBetween from 'dayjs/plugin/isBetween'
import { data } from 'autoprefixer'
import { orderChartData, orderChartOptions } from './chart.config'
dayjs.extend(isBetween)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default function Statistics() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [orderData, setOrderData] = useState({})
  const [chartData, setChartData] = useState({ labels: [], datasets: [] })
  const [errorMessage, setErrorMessage] = useState({
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrderData(res.data.message))
      .catch((e) => console.log(e))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let tmpErrorMessage = { startDate: '', endDate: '' }
    const parseStartDate = dayjs(startDate)
    const parseEndDate = dayjs(endDate)
    if (!parseStartDate.isValid()) {
      tmpErrorMessage.startDate = 'Start date is not valid.'
    } else {
      if (parseStartDate.diff(dayjs()) > 0)
        tmpErrorMessage.startDate = 'Start date cannot be after today.'
    }

    if (!parseEndDate.isValid()) {
      tmpErrorMessage.endDate = 'End date is not valid.'
    } else {
      if (parseEndDate.diff(dayjs()) > 0)
        tmpErrorMessage.endDate = 'End date cannot be after today.'
    }
    if (tmpErrorMessage.startDate == '' && tmpErrorMessage.endDate == '') {
      if (parseStartDate.diff(parseEndDate) > 0)
        tmpErrorMessage.startDate = 'Start date cannot be after end date.'
      else {
        let filteredData = orderData.filter((order) =>
          dayjs(order.createdAt).isBetween(
            parseStartDate,
            parseEndDate,
            'day',
            '[]',
          ),
        )
        let tmpChartData = { labels: [], data: [] }
        let log = {}
        filteredData.forEach((order) => {
          const dateLabel = dayjs(order.createdAt).format('MM/DD/YYYY')
          if (log[dateLabel]) log[dateLabel] += order.totalValue
          else log[dateLabel] = order.totalValue
        })
        Object.keys(log).forEach((date) => {
          tmpChartData.labels.push(date)
          tmpChartData.data.push(log[date])
        })

        setChartData(tmpChartData)
      }
    }
    setErrorMessage(tmpErrorMessage)
  }

  return (
    <div className="h-screen flex flex-col place-items-center py-16">
      <h1 className="text-3xl font-semibold">Orders</h1>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form
          className="mt-6 flex items-start relative"
          onSubmit={handleSubmit}
        >
          <DatePicker
            id="startDate"
            name="startDate"
            label="Start date"
            value={startDate}
            onChange={(value) => setStartDate(value)}
            maxDate={new Date()}
            renderInput={(params) => {
              params.error = errorMessage.startDate !== ''
              params.helperText = errorMessage.startDate
              return <TextField {...params} />
            }}
          />
          <div className="flex items-center h-14">
            <span className="mx-4">to</span>
          </div>
          <DatePicker
            id="endDate"
            name="endDate"
            label="End date"
            value={endDate}
            onChange={(value) => setEndDate(value)}
            maxDate={new Date()}
            renderInput={(params) => {
              params.error = errorMessage.endDate !== ''
              params.helperText = errorMessage.endDate
              return <TextField {...params} />
            }}
          />

          <Button
            type="submit"
            variant="contained"
            className="ml-2 h-14 absolute top-0 -right-24"
          >
            Apply
          </Button>
        </form>
      </LocalizationProvider>
      {chartData.labels.length > 0 && (
        <div className="w-2/3 mt-4">
          <Line
            options={orderChartOptions}
            data={orderChartData(chartData.labels, chartData.data)}
          />
        </div>
      )}
    </div>
  )
}
