import { Grid } from '@mui/material'
import Navigation from 'components/Navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLatestTexts } from 'services/inbox.service'

import { getInbox } from 'services/inbox.service'
import { verifyToken } from 'services/user.service'
import socketClient from 'socket.io-client'
import Content from './Content'
import ChatSkeleton from './Skeleton'
import Users from './Users'

const SERVER = 'http://127.0.0.1:9000'

export default function Messages() {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [userList, setUserList] = useState([])
  const [receipient, setReceipient] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState({})
  const [latestTexts, setLatestTexts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newMessageNotification, setNewMessageNotification] = useState({})
  const socket = socketClient(SERVER, { autoConnect: false })
  const socketRef = useRef()

  useEffect(() => {
    // Verify token and navigate to login if token not found
    const token = localStorage.getItem('token')
    setIsLoading(true)
    if (token && token !== '') {
      verifyToken({ token })
        .then(() => {
          socket.auth = { userID: localStorage.getItem('id') }
          socketRef.current = socket.connect()
          setIsConnected(true)
        })
        .catch(() => navigate('/login'))
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (isConnected) {
      // Run when there's a connection error
      socketRef.current.on('connect_error', (err) => {
        if (err.message === 'invalid user ID') {
          enqueueSnackbar("Something's wrong", {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            autoHideDuration: 2000,
          })
        }
      })

      // Run whenever a new user joins
      socketRef.current.on('users', async (users) => {
        users = users.sort((a, b) => {
          if (a.lastName < b.lastName) return -1
          return a.lastName > b.lastName ? 1 : 0
        })
        setUserList(users)
        getLatestTexts({
          token: localStorage.getItem('token'),
          users,
        })
          .then((res) => {
            setLatestTexts(res.data.message)
            setIsLoading(false)
          })
          .catch((e) => console.log(e))
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (isConnected) {
      // Run whenever user receives a new message
      socketRef.current.on('receiveMsg', ({ content, from }) => {
        const tempMsg = { ...messages }

        userList.forEach((user) => {
          if (user._id == from) {
            const data = {
              content,
              from,
              to: localStorage.getItem('id'),
              timeStamp: new Date(),
            }
            if (messages[from]) {
              tempMsg[from].push(data)
            } else {
              tempMsg[from] = [data]
            }
            setMessages(tempMsg)
            setNewMessageNotification(user)

            // Update latest text between 2 users
            const tempLatestTexts = [...latestTexts]
            tempLatestTexts.map((text) => {
              if (text.from == from || text.to == from) {
                text.content = content
              }
            })
            setLatestTexts(tempLatestTexts)
          }
        })
      })

      return () => {
        socketRef.current.off('receiveMsg')
      }
    }
  }, [messages, userList])

  useEffect(() => {
    handleGetInbox()
  }, [receipient])

  // Handle fetching all messages in a specific inbox between 2 users
  const handleGetInbox = () => {
    receipient &&
      getInbox({
        token: localStorage.getItem('token'),
        user: receipient._id,
      })
        .then((res) => {
          const tempMsg = { ...messages }
          tempMsg[receipient._id] = res.data.message
          console.log(res.data.message)
          setMessages(tempMsg)
        })
        .catch((e) => {
          console.log(e)
        })
  }

  // Handle sending a message
  const handleSendMessage = (content) => {
    if (content != '') {
      socketRef.current.emit('sendMsg', {
        content,
        toUser: receipient._id,
        toChat: receipient.chatID,
      })
      const tempMsg = { ...messages }
      const data = {
        content,
        from: localStorage.getItem('id'),
        to: receipient._id,
        timeStamp: new Date(),
      }
      if (messages[receipient._id]) {
        tempMsg[receipient._id].push(data)
      } else {
        tempMsg[receipient._id] = [data]
      }
      setMessages(tempMsg)

      // Update latest text between 2 users
      const tempLatestTexts = [...latestTexts]
      tempLatestTexts.map((text) => {
        if (text.from == receipient._id || text.to == receipient._id) {
          text.content = content
        }
      })
      setLatestTexts(tempLatestTexts)
    }
  }

  return (
    <>
      <Navigation />
      <Grid container>
        <Grid item md={4}>
          {isLoading ? (
            <ChatSkeleton />
          ) : (
            <Users
              users={[1]}
              setReceipient={setReceipient}
              setNewMessageNotification={setNewMessageNotification}
              newMessageNotification={newMessageNotification}
              latestTexts={latestTexts}
            />
          )}
        </Grid>
        <Grid item md={8}>
          <Content
            messages={messages}
            receipient={receipient}
            handleSendMessage={handleSendMessage}
            setNewMessageNotification={setNewMessageNotification}
          />
        </Grid>
      </Grid>
    </>
  )
}
