const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Erro na comunicação com a IA.' });
  }
});

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
