import { Button, Card, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import Navigation from 'components/Navigation'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { getAllOrders } from 'services/order.service'
import {
  orderQuantityChartData,
  orderQuantityChartOptions,
  orderValueChartData,
  orderValueChartOptions,
} from './chart.config'

dayjs.extend(isBetween)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export default function Statistics() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [orderData, setOrderData] = useState({})
  const [chartData, setChartData] = useState({
    labels: [],
    valueData: [],
    quantityData: [],
  })
  const [errorMessage, setErrorMessage] = useState({
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrderData(res.data.message))
      .catch((e) =>
        enqueueSnackbar(e.response.data.message || "Something's wrong", {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        }),
      )
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
        let tmpChartData = { labels: [], valueData: [], quantityData: [] }
        let valueLog = {}
        let quantityLog = {}

        filteredData.forEach((order) => {
          const dateLabel = dayjs(order.createdAt).format('MM/DD/YYYY')

          if (valueLog[dateLabel]) {
            valueLog[dateLabel] += order.totalValue
          } else {
            valueLog[dateLabel] = order.totalValue
          }

          let quantity = 0
          Object.keys(order.list).forEach((product) => {
            quantity += order.list[product]
          })
          quantityLog[dateLabel] = quantity
        })

        Object.keys(valueLog).forEach((date) => {
          tmpChartData.labels.push(date)
          tmpChartData.valueData.push(valueLog[date])
          tmpChartData.quantityData.push(quantityLog[date])
        })
        setChartData(tmpChartData)
      }
    }
    setErrorMessage(tmpErrorMessage)
  }

  return (
    <>
      <Navigation />
      <div className="flex flex-col place-items-center px-20 py-20 w-screen overflow-x-hidden">
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

        {chartData.valueData.length > 0 && chartData.quantityData.length > 0 && (
          <div className="flex w-full mt-8 justify-center">
            <Card className="w-2/5 h-96">
              <Line
                options={orderValueChartOptions}
                data={orderValueChartData(
                  chartData.labels,
                  chartData.valueData,
                )}
              />
            </Card>
            <Card className="w-2/5 h-96 ml-8">
              <Bar
                options={orderQuantityChartOptions}
                data={orderQuantityChartData(
                  chartData.labels,
                  chartData.quantityData,
                )}
              />
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
