import shoppingCart from 'assets/img/shopping_cart.svg'
import { AccountCircle, Star } from '@mui/icons-material'

export default function Feedback() {
  return (
    <div className="mt-10 flex">
      <div className="mt-10 w-2/5 pl-20">
        <img src={shoppingCart} className="w-full" />
      </div>
      <div className="mt-20 ml-32 w-1/3">
        <h1 className="text-3xl font-bold">Customer's Feedback</h1>
        <p className="italic leading-8 mt-4">
          Whole front do of plate heard oh ought. His detective nor convinced
          residence own. Connection has put impossible own apartment boisterous.
        </p>
        <div className="flex items-center mt-6">
          <AccountCircle className="text-5xl" />
          <div className="ml-4">
            <p className="text-sm font-medium">Jim Hopper, IN</p>
            <div>
              <Star className="text-[15px] text-yellow-500" />
              <Star className="text-[15px] text-yellow-500" />
              <Star className="text-[15px] text-yellow-500" />
              <Star className="text-[15px] text-yellow-500" />
              <Star className="text-[15px] text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
