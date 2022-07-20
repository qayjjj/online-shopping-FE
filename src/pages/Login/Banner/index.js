import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import augmentedReality from 'assets/img/augmented_reality.svg'
import stats from 'assets/img/stats.svg'
import programmer from 'assets/img/programmer.svg'
import mobileInterface from 'assets/img/mobile_interface.svg'
import './styles.css'

function LogInBanner() {
  const SwiperButtonPrev = () => {
    const swiper = useSwiper()
    return (
      <button
        className="prev-button cursor-pointer -rotate-90"
        onClick={() => swiper.slidePrev()}
      >
        <span className="text-xl text-white opacity-80">^</span>
      </button>
    )
  }
  const SwiperButtonNext = () => {
    const swiper = useSwiper()
    return (
      <button
        className="next-button cursor-pointer rotate-90 "
        onClick={() => swiper.slideNext()}
      >
        <span className="text-xl text-white opacity-80">^</span>
      </button>
    )
  }

  return (
    <div className="bg-gradient-to-tr from-[#3034a7] to-[#6c63ff] w-1/2 h-screen flex items-center overflow-y-scroll">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="grid justify-items-center text-white">
            <img src={stats} className="w-3/5" />
            <h1 className="font-medium text-md mt-10">
              Welcome to your new dashboard
            </h1>
            <h2 className="text-xs mt-2 opacity-70">
              Sign in to manage your products.
            </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid justify-items-center">
            <img src={programmer} className="w-72" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid justify-items-center">
            <img src={augmentedReality} className="w-4/5" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid justify-items-center">
            <img src={mobileInterface} className="w-1/2" />
          </div>
        </SwiperSlide>
        <SwiperButtonPrev />
        <SwiperButtonNext />
      </Swiper>
    </div>
  )
}

export default LogInBanner
