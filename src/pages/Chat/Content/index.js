import { AccountCircle, Send, Sms } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRef } from 'react'

export default function Content({
  messages,
  receipient,
  handleSendMessage,
  setNewMessageNotification,
}) {
  const inputRef = useRef()

  return !!receipient ? (
    <div
      className="h-screen flex flex-col"
      onClick={() => setNewMessageNotification(false)}
    >
      <div className="flex items-center border-b border-gray-300 px-6 py-4">
        <AccountCircle className="text-4xl" />
        <h1 className="text-xl ml-3">
          {receipient.firstName + ' ' + receipient.lastName}
        </h1>
      </div>
      <div id="messages" className="grow overflow-y-auto">
        {messages[receipient._id]?.map((text, index) => {
          if (text.from == localStorage.getItem('id')) {
            return (
              <div key={index} className="grid px-6 mt-2">
                <div className="px-4 py-1 rounded-2xl justify-self-end bg-[#6c63ff] text-white max-w-lg">
                  {text.content}
                </div>
              </div>
            )
          } else
            return (
              <div key={index} className="grid px-4 mt-2">
                <h1 className="px-4 py-1 rounded-2xl justify-self-start bg-gray-400 text-white flex items-center">
                  {text.content}
                </h1>
              </div>
            )
        })}
      </div>
      <form
        className="border-t w-full h-16 px-6 py-4 flex items-center"
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage(inputRef.current.value)
          inputRef.current.value = ''
        }}
      >
        <input
          autoFocus
          className="grow h-full focus:outline-0"
          placeholder="Enter a message"
          ref={inputRef}
        />
        <IconButton
          type="submit"
          onClick={() => {
            handleSendMessage(inputRef.current.value)
            inputRef.current.value = ''
          }}
        >
          <Send className="cursor-pointer hover:text-[#6c63ff]" />
        </IconButton>
      </form>
    </div>
  ) : (
    <div className="h-screen grid place-items-center">
      <div className="text-center text-gray-400">
        <Sms className="text-4xl" />
        <h1 className="mt-2">Select an user to start chatting</h1>
      </div>
    </div>
  )
}
