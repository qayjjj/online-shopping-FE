import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
} from '@mui/material'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import { getAllProducts } from 'services/product.service'

const listArraySkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default function Products() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const pageSizes = [4, 8, 12]

  const navigate = useNavigate()

  useEffect(() => {
    retrieveProducts()
  }, [])

  const handlePageSizeChange = (e) => {
    setPage(1)
    setPageSize(e.target.value)
    const newCount = Math.ceil(products.length / e.target.value)
    setCount(newCount)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleCurrentProducts = () => {
    const begin = (page - 1) * pageSize
    const end = begin + pageSize
    return products.slice(begin, end)
  }

  const retrieveProducts = () => {
    setIsLoading(true)
    getAllProducts()
      .then((response) => {
        setProducts(response.data.message)
        setCount(Math.ceil(response.data.message.length / pageSize))
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Navbar />
      <div className="px-32">
        <Grid container spacing={3} className="mt-10">
          {isLoading
            ? listArraySkeleton.map((item, key) => (
                <Grid item md={3} key={key}>
                  <Card>
                    <CardMedia>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        className="h-44"
                      />
                    </CardMedia>
                    <CardContent>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        className="w-32 h-8"
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        className="w-24 h-6"
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        className="w-16 h-6"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : handleCurrentProducts().map((product, index) => {
                return (
                  // A single product display
                  <Grid item md={3} key={product._id}>
                    <Fade
                      direction="up"
                      cascade
                      delay={100 * index}
                      triggerOnce={true}
                    >
                      <Card>
                        <CardActionArea
                          onClick={() => navigate(`/details/${product._id}`)}
                        >
                          <CardMedia className="h-44 overflow-hidden">
                            <img
                              src={product.image}
                              className="w-full min-h-full"
                            />
                          </CardMedia>
                          <CardContent className="justify-self-start text-left">
                            <h1 className="text-2xl truncate">
                              {product.name}
                            </h1>
                            <p className="text-gray-500 text-sm mt-2 truncate">
                              {product.description}
                            </p>
                            <p className="text-gray-700 text-sm mt-2">
                              $ {product.price}
                            </p>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Fade>
                  </Grid>
                )
              })}
        </Grid>
        <div className="mt-10 flex items-center justify-between">
          <div variant="standard" className="flex items-center">
            <h1 className="text-sm">Items per page</h1>
            <Select
              id="pageSize"
              name="pageSize"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e)}
              className="w-18 h-8 ml-2"
              inputProps={{ className: 'text-sm' }}
            >
              {pageSizes.map((size) => (
                <MenuItem value={size} key={size} className="text-sm">
                  {size}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Pagination count={count} page={page} onChange={handlePageChange} />
        </div>
      </div>
      <Footer />
    </>
  )
}
