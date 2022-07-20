import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import office from 'assets/img/office.svg'

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="px-44 py-24 flex">
        <img src={office} className="w-1/3" />
        <div className="ml-24 mt-10">
          <h1 className="text-4xl font-semibold">About Us</h1>
          <p className="mt-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
