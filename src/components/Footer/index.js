import logomark from 'assets/img/Logomark.svg'
import {
  Email,
  PhoneInTalk,
  Facebook,
  Twitter,
  Instagram,
} from '@mui/icons-material'

export default function Footer() {
  return (
    <div className="mt-10 px-32 py-16 flex justify-between bg-[#6c63ff] text-white">
      <div>
        <div className="flex items-center">
          <img src={logomark} className="h-8" />
          <h1 className="ml-2 text-xl font-medium">CompanyName.</h1>
        </div>
        <div className="mt-4 w-56">
          <p className="text-sm">
            Some cool slogan that companies use in their footer.
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl">Contact</h1>
        <div className="flex items-center mt-3">
          <Email className="text-xl" />
          <a href="mailto: trnquanh@gmail.com" className="ml-3">
            trngquanh@gmail.com
          </a>
        </div>
        <div className="flex items-center mt-2">
          <PhoneInTalk className="text-xl" />
          <a href="tel:123-456-7890" className="ml-3">
            123-456-7890
          </a>
        </div>
        <div className="flex mt-4">
          <Facebook />
          <Twitter className="ml-6" />
          <Instagram className="ml-6" />
        </div>
      </div>
    </div>
  )
}
