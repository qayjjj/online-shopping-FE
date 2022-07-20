import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton,
} from '@mui/material'
import { Inventory } from '@mui/icons-material'
import Delete from '@mui/icons-material/Delete'
import AddProductForm from './AddProductForm'
import { verifyToken } from 'services/user.service'
import { listProducts, deleteProduct } from 'services/product.service'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Fade } from 'react-reveal'
import Navigation from 'components/Navigation'

const listArraySkeleton = [1, 2, 3, 4]

export default function Dashboard() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [productId, setProductId] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && token !== '') {
      verifyToken({ token })
        .then(() => handleListProducts())
        .catch(() => navigate('/login'))
    } else {
      navigate('/login')
    }
  }, [])

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleListProducts = () => {
    const token = localStorage.getItem('token')
    setIsLoading(true)
    listProducts({ token })
      .then((res) => {
        setIsLoading(false)
        setProducts(res.data.message)
      })
      .catch((e) => {
        setIsLoading(false)
        enqueueSnackbar("Can't fetch products", {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      })
  }

  const handleDeleteButtonClick = () => {
    setShowDialog(false)
    handleDeleteProduct(productId)
  }

  const handleDeleteProduct = (productID) => {
    const data = {
      productID,
      token: localStorage.getItem('token'),
    }
    deleteProduct(data)
      .then(() => handleListProducts())
      .then(() => {
        enqueueSnackbar('Product deleted successfully', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      })
      .catch((e) =>
        enqueueSnackbar('Something happened while deleting the product', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        }),
      )
  }

  return (
    <div className="px-20 py-20 w-screen overflow-x-hidden">
      {/* Header */}
      <div className="relative">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Button className="absolute -top-10 right-0" onClick={handleLogOut}>
          Log Out
        </Button>
        <AddProductForm handleListProducts={handleListProducts} />
      </div>
      <Grid container spacing={2} className="mt-4">
        {isLoading ? (
          listArraySkeleton.map((item, key) => (
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
        ) : products.length == 0 ? (
          <div className="h-80 w-full grid place-items-center text-gray-400">
            <div className="flex flex-col items-center text-md">
              <Inventory className="w-24" />
              <h1 className="mt-2">You don't have anything to show.</h1>
              <h1>Add new products.</h1>
            </div>
          </div>
        ) : (
          products.map((product, index) => {
            return (
              // A single product display
              <Grid item md={3} key={product._id}>
                <Fade bottom delay={100 * index}>
                  <Card>
                    <CardActionArea
                      onClick={() => navigate(`/details/${product._id}`)}
                    >
                      <CardMedia className="h-44 overflow-hidden">
                        <img src={product.image} />
                      </CardMedia>
                      <CardContent className="justify-self-start text-left pb-0">
                        <h1 className="text-2xl">{product.name}</h1>
                        <p className="text-gray-500 text-sm mt-2 truncate">
                          {product.description}
                        </p>
                        <p className="text-gray-700 text-sm mt-2">
                          $ {product.price}
                        </p>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className="grid justify-items-end pt-0">
                      <Delete
                        className="w-8 cursor-pointer"
                        onClick={() => {
                          setShowDialog(true)
                          setProductId(product._id)
                        }}
                      />
                    </CardActions>
                  </Card>
                </Fade>
              </Grid>
            )
          })
        )}

        {/* Delete Product Dialog */}
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>Delete this product?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You won't be able to retrieve this product.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteButtonClick} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Navigation />
    </div>
  )
}
