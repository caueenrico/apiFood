require("express-async-errors") //tive que adicionar para que eu consiga usar o tratamento de exceções

const express = require("express")
const cors = require('cors')
const routes = require('./routes')
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")


const app = express()
app.use(cors()); //aqui é para que o backend consiga atender as requisições do front
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER)) //aqui é para que ele me sirva as imagens do meu banco de dados

app.use(routes)

app.use((error, request, response, next) => {
  if(error instanceof AppError){ //para erros do lado do cliente
    response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({ //erros do lado do servidor
    status: 'error',
    message: "Internal Server Error"
  })
})
  
app.listen(3000, () => console.log('server is running') )