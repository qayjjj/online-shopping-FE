import { AccountCircle, FiberManualRecord } from '@mui/icons-material'
import { Skeleton } from '@mui/material'

const listArraySkeleton = [1, 2, 3, 4, 5]
export default function ChatSkeleton() {
  return (
    <div className="h-screen border-r border-gray-300 flex flex-col">
      <div className="pl-20 py-4 flex items-center">
        <h1 className="font-semibold text-2xl">Online Users</h1>
        <FiberManualRecord className="ml-3 text-base text-green-500" />
      </div>
      {listArraySkeleton.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pl-20 pr-6 py-4 flex items-center cursor-pointer"
        >
          <AccountCircle className="text-4xl" />
          <div className="flex flex-col ml-4 overflow-hidden">
            <Skeleton variant="text" className="w-28 h-7" />
            <Skeleton variant="text" className="w-52 h-5" />
          </div>
        </div>
      ))}
    </div>
  )
}
