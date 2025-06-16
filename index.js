const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


app.post('/create', async (req, res) => {
  try {
    const { title, body } = req.body;
    const publication = new Publication({ title, body });
    await publication.save();
    res.status(201).send(publication);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/', async (req, res) => {
  try {
    const publications = await Publication.find();
    res.send(publications);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/:id', async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).send('Publicación no encontrada');
    res.send(publication);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put('/:id', async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publication) return res.status(404).send('Publicación no encontrada');
    res.send(publication);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) return res.status(404).send('Publicación no encontrada');
    res.send('Publicación eliminada');
  } catch (err) {
    res.status(500).send(err);
  }
});

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/redSocial', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar:', err);
});

const publicationSchema = new mongoose.Schema({
  title: String,
  body: String,
  timestamp: { type: Date, default: Date.now }
});

const Publication = mongoose.model('Publication', publicationSchema);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});