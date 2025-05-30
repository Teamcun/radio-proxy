import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get('/', async (req, res) => {
  const radioUrl = 'https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_32167_stream_195287354';

  try {
    const response = await fetch(radioUrl);
    if (!response.ok) throw new Error('No se pudo acceder al stream');

    res.set({
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
    });

    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al acceder al stream');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy activo en el puerto ${PORT}`);
});

