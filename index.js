const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const axios = require('axios')

app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hai from server :)' })
})

app.get('/posts', (req, res) => {
  axios.get('http://34.66.149.194/ayranime/recent')
    .then(_res => {
      _res.data.ok = true
      _res.data.msg = ''
      res.json(_res.data)
    })
    .catch(e => {
      console.log(e)
      res.status(400).json({ok: false, msg: 'An error occurred.'})
    })
})

app.get('/post/:id', (req, res) => {
  axios.get('http://34.66.149.194/ayranime/post', {
    params: {id: req.params.id}
  })
    .then(_res => {
      _res.data.ok = true
      _res.data.msg = ''
      res.json(_res.data)
    })
    .catch(e => {
      if (e.response.status == 500) {
        return res.status(404).json({ok: false, msg: `Post's not found.`})
      }
      res.status(400).json({ok: false, msg: 'An error occurred.'})
    })
})

app.get('/all', (req, res) => {
  axios.get('http://34.66.149.194/ayranime/all', {
    params: {page: req.query.page || 1, category: 2}
  })
    .then(_res => {
      _res.data.ok = true
      _res.data.msg = ''
      res.json(_res.data)
    })
    .catch(e => {
      res.status(400).json({ok: false, msg: 'An error occurred.'})
    })
})



app.listen(port, () => console.log(`app run on port ${port}`))