import React from 'react'
import { useSnackbar } from 'notistack'
import {
  AccountCircle,
  CleanHands,
  FiberManualRecord,
  Search,
} from '@mui/icons-material'
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import { useState, useRef } from 'react'
import { getUser, addUser } from 'services/user.service'

export default function Users(props) {
  const newUserRef = useRef()
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [user, setUser] = useState({})
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  console.log('online', props.onlineUsers)
  const handleSearchUser = () => {
    const data = {
      email: newUserRef.current.value,
      token: localStorage.getItem('token'),
    }
    getUser(data)
      .then((res) => {
        setUser(res.data.message)
        setShowUserDialog(true)
      })
      .catch((e) => {
        setUser(null)
        setShowUserDialog(true)
      })
  }

  const handleAddFriend = () => {
    const data = {
      email: newUserRef.current.value,
      token: localStorage.getItem('token'),
    }
    addUser(data)
      .then(() => {
        enqueueSnackbar('User added succesfully', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
        setShowUserDialog(false)
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="h-screen border-r border-gray-300 flex flex-col">
      <div className="pl-20 py-4 mt-4">
        <h1 className="font-semibold text-2xl">Chat</h1>
      </div>
      <div className="ml-20 mr-8 px-4 py-1 flex border-2 border-solid rounded-3xl">
        <input
          className="w-full focus:outline-0"
          placeholder="Add new user by email"
          type="text"
          ref={newUserRef}
        />
        <IconButton>
          <Search onClick={handleSearchUser} />
        </IconButton>
      </div>
      <Dialog open={showUserDialog} onClose={() => setShowUserDialog(false)}>
        <DialogTitle>
          Search by email: {newUserRef?.current?.value}{' '}
        </DialogTitle>
        <DialogContent>
          {user ? (
            <DialogContentText className="flex flex-col">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
            </DialogContentText>
          ) : (
            <h1 className="text-gray-400">User not found.</h1>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUserDialog(false)}>Cancel</Button>
          <Button disabled={!user} autoFocus onClick={handleAddFriend}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {props.friends.length > 0 ? (
        props.friends.map(
          (friend, index) =>
            friend._id !== localStorage.getItem('id') && (
              <div
                key={index}
                className="border-b border-gray-300 pl-20 pr-6 py-4 flex items-center cursor-pointer"
                onClick={() => {
                  if (props.newMessageNotification)
                    props.setNewMessageNotification({})
                  props.setReceipient(friend)
                }}
              >
                <AccountCircle className="text-4xl" />
                <div className="flex flex-col ml-4 overflow-hidden">
                  <div className="flex">
                    <h1 className="text-lg">
                      {friend.firstName + ' ' + friend.lastName}
                    </h1>
                    {props.onlineUsers.map(
                      (user, index) =>
                        user._id == friend._id && (
                          <FiberManualRecord className="text-xs mt-2 ml-3 text-green-500" />
                        ),
                    )}
                    {/* {props.newMessageNotification == user && (
                      <FiberManualRecord className="text-xs mt-2 ml-3 text-red-500" />
                    )} */}
                  </div>
                  {props.latestTexts.map((text, index) => {
                    if (text.from == friend._id || text.to == friend._id) {
                      return (
                        <h1
                          key={index}
                          className="text-gray-400 text-sm truncate"
                        >
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
          <h1>No friends yet.</h1>
        </div>
      )}
    </div>
  )
}
