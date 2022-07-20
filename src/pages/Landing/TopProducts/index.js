import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const listArraySkeleton = [1, 2, 3, 4]
export default function TopProducts(props) {
  const navigate = useNavigate()

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold">Top Products</h1>
      <Grid container spacing={2} className="mt-4">
        {props.isLoading
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
          : props.products.map((product) => (
              <Grid item md={3} key={product._id}>
                <Card>
                  <CardActionArea
                    onClick={() => navigate(`/details/${product._id}`)}
                  >
                    <CardMedia className="h-44 overflow-hidden">
                      <img src={product.image} className="w-full min-h-full" />
                    </CardMedia>
                    <CardContent className="justify-self-start text-left">
                      <h1 className="text-2xl">{product.name}</h1>
                      <p className="text-gray-500 text-sm mt-2 truncate">
                        {product.description}
                      </p>
                      <p className="text-gray-700 text-sm mt-2">
                        $ {product.price}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>
      <div className="mt-4 flex justify-end">
        <Link to="/products">
          <p className="text-[#6c63ff]">See more</p>
        </Link>
      </div>
    </div>
  )
}
