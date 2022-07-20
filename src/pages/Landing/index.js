import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTopProducts } from 'services/product.service'
import { getAllProducts } from 'services/product.service'
import { getAllUsers } from 'services/user.service'
import LandingBanner from './Banner'
import Navbar from 'components/Navbar'
import TopProducts from './TopProducts'
import Feedback from './Feedback'
import Footer from 'components/Footer'

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [productCount, setProductCount] = useState(0)
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    setIsLoading(true)

    getAllUsers()
      .then((res) => {
        setUserCount(res.data.message.length)
        getAllProducts()
          .then((res) => {
            setProductCount(res.data.message.length)
          })
          .catch((e) => console.log(e))
        getTopProducts()
          .then((res) => {
            setTopProducts(res.data.message)
            setIsLoading(false)
          })
          .catch((e) => console.log(e))
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <>
      <Navbar />
      <div className="px-32 py-16">
        <LandingBanner
          isLoading={isLoading}
          userCount={userCount}
          productCount={productCount}
        />
        <TopProducts products={topProducts} isLoading={isLoading} />
        <Feedback />
      </div>
      <Footer />
    </>
  )
}
