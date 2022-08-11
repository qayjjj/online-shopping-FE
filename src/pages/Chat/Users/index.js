import React from 'react'
import { AccountCircle, FiberManualRecord } from '@mui/icons-material'

export default function Users(props) {
  return (
    <div className="h-screen border-r border-gray-300 flex flex-col">
      <div className="pl-20 py-4 flex items-center">
        <h1 className="font-semibold text-2xl">Online Users</h1>
        <FiberManualRecord className="ml-3 text-base text-green-500" />
      </div>
      {props.users.length > 1 ? (
        props.users.map(
          (user, index) =>
            user._id !== localStorage.getItem('id') && (
              <div
                key={index}
                className="border-b border-gray-300 pl-20 pr-6 py-4 flex items-center cursor-pointer"
                onClick={() => {
                  if (props.newMessageNotification)
                    props.setNewMessageNotification({})
                  props.setReceipient(user)
                }}
              >
                <AccountCircle className="text-4xl" />
                <div className="flex flex-col ml-4 overflow-hidden">
                  <div className="flex">
                    <h1 className="text-lg">
                      {user.firstName + ' ' + user.lastName}
                    </h1>
                    {props.newMessageNotification == user && (
                      <FiberManualRecord className="text-xs mt-2 ml-3 text-red-500" />
                    )}
                  </div>
                  {props.latestTexts.map((text) => {
                    if (text.from == user._id || text.to == user._id) {
                      return (
                        <h1 className="text-gray-400 text-sm truncate">
                          {text.content}
                        </h1>
                      )
                    }
                  })}
                </div>
              </div>
            ),
        )
      ) : (
        <div className="grid place-items-center h-screen text-gray-400">
          <h1>No online users</h1>
        </div>
      )}
    </div>
  )
}
