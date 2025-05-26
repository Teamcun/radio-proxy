// radio-proxy.js
import express from 'express';
import request from 'request';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/radio', (req, res) => {
  const radioUrl = 'https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_32167_stream_195287354';

  req.pipe(
    request({
      url: radioUrl,
      headers: {
        'Referer': 'https://ilcna.radiostream321.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36'
      },
    })
  ).on('error', err => {
    res.status(500).send('Error en el servidor proxy');
  }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en puerto ${PORT}`);
});