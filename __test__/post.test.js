const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Post = require('../models/Post');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Post.deleteMany();
});

describe('POST /api/posts/create', () => {
  it('debería crear una publicación con título y cuerpo válidos', async () => {
    const res = await request(app)
      .post('/api/posts/create')
      .send({ title: 'Prueba', body: 'Contenido de prueba' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Prueba');
    expect(res.body.body).toBe('Contenido de prueba');
  });

  it('debería fallar si faltan título o cuerpo', async () => {
    const res = await request(app)
      .post('/api/posts/create')
      .send({ title: 'Prueba' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('cuerpo es obligatorio');
  });
});

describe('GET /api/posts', () => {
  it('debería devolver todas las publicaciones', async () => {
    await Post.create({ title: 'Prueba 1', body: 'Contenido 1' });
    await Post.create({ title: 'Prueba 2', body: 'Contenido 2' });
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});