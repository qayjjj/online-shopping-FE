import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { viewProductDetails } from '../../services/product.service'
import { Grid, Button, Card, CardActionArea, Modal } from '@mui/material'
import { AddCircle, RemoveCircle, AddShoppingCart } from '@mui/icons-material'
import { Fade } from 'react-reveal'
import DetailsSkeleton from './Skeleton'
import DetailsNavbar from './Navbar'
import { addToCart, getTotalCartItems } from '../../services/cart.service'

export default function Details() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { productID } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [viewImage, setViewImage] = useState(false)
  const [cartNumber, setCartNumber] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    getTotalCartItems({ token: localStorage.getItem('token') }).then((res) =>
      setCartNumber(res.data.message),
    )
    viewProductDetails({ productID })
      .then((res) => {
        setIsLoading(false)
        setProduct(res.data.message)
      })
      .catch(() =>
        enqueueSnackbar('Something is wrong', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        }),
      )
  }, [])

  const handleAddToCart = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const data = {
        token,
        productID,
        quantity,
      }
      addToCart(data)
        .then(() =>
          getTotalCartItems({ token }).then((res) =>
            setCartNumber(res.data.message),
          ),
        )
        .then(() =>
          enqueueSnackbar('Added to cart', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            autoHideDuration: 2000,
          }),
        )
        .catch((err) => {
          enqueueSnackbar(
            err.response.data.message ||
              'Some error occured while adding to cart.',
            {
              variant: 'error',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
              autoHideDuration: 2000,
            },
          )
        })
    } else navigate('/login')
  }

  return (
    <div className="px-32 py-20">
      <DetailsNavbar cartNumber={cartNumber} />
      {isLoading ? (
        <DetailsSkeleton />
      ) : (
        <Fade bottom>
          <Card className="mt-8 h-[32rem]">
            <Grid container className="h-full">
              <Grid item md={6}>
                <Card className="h-full grid place-items-center">
                  <CardActionArea
                    className="h-full"
                    onClick={() => setViewImage(true)}
                  >
                    <img src={product.image} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Modal
                open={viewImage}
                onClose={() => setViewImage(false)}
                className="grid place-items-center"
              >
                <img src={product.image} className="h-[40rem]" />
              </Modal>
              <Grid item md={6} className="h-full">
                <div className="flex flex-col justify-between h-full px-20 py-10">
                  <div className="grow">
                    <h1 className="text-3xl font-medium">{product.name}</h1>
                    <h2 className="text-2xl font-medium mt-2">
                      $ {product.price}
                    </h2>
                    <h2 className="text-lg font-medium mt-8">Description</h2>

                    <p className="text-sm mt-2">{product.description}</p>
                  </div>
                  <div>
                    <div className="mt-6 flex justify-between">
                      <h2 className="text-lg font-medium">Quantity</h2>
                      <div className="flex w-1/4">
                        <RemoveCircle
                          className={
                            quantity > 1
                              ? 'w-1/3 cursor-pointer'
                              : 'w-1/3 text-gray-300'
                          }
                          onClick={() => setQuantity(quantity - 1)}
                        />
                        <div className="w-1/3 text-center">{quantity}</div>
                        <AddCircle
                          className="w-1/3 cursor-pointer"
                          onClick={() => setQuantity(quantity + 1)}
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-between mt-8 border-t-2 border-dashed border-gray-200 pt-10">
                      <Button
                        variant="contained"
                        color="warning"
                        className="w-2/5 h-14"
                        onClick={handleAddToCart}
                      >
                        <AddShoppingCart className="w-8" />
                        Add to cart
                      </Button>
                      <p className="flex items-center text-gray-500">- OR -</p>
                      <Button variant="contained" className="w-2/5 h-14">
                        Buy now
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Fade>
      )}
    </div>
  )
}
