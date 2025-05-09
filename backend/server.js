import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

// Registrar usuario
app.post('/register', async (req, res) => {
  const { nombre, edad, correo, contraseña } = req.body;
  const hash = await bcrypt.hash(contraseña, 10);
  const sql = 'INSERT INTO Usuario (nombre, edad, correo, contraseña) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, edad, correo, hash], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Usuario registrado' });
  });
});

// Login usuario
app.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;
  db.query('SELECT * FROM Usuario WHERE correo = ?', [correo], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

    const usuario = results[0];
    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    res.json({ message: 'Login exitoso', idUsuario: usuario.idUsuario, nombre: usuario.nombre });
  });
});

// Obtener tareas por usuario
app.get('/tareas/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  db.query('SELECT * FROM Tareas WHERE idUsuario = ?', [idUsuario], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear tarea
app.post('/tareas', (req, res) => {
  const { titulo, descripcion, estado, fecha_vencimiento, idUsuario } = req.body;
  const sql = 'INSERT INTO Tareas (titulo, descripcion, estado, fecha_vencimiento, idUsuario) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [titulo, descripcion, estado, fecha_vencimiento, idUsuario], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Tarea creada' });
  });
});

// Actualizar tarea
app.put('/tareas/:idTarea', (req, res) => {
  const { idTarea } = req.params;
  const { titulo, descripcion, estado, fecha_vencimiento } = req.body;
  const sql = 'UPDATE Tareas SET titulo = ?, descripcion = ?, estado = ?, fecha_vencimiento = ? WHERE idTarea = ?';
  db.query(sql, [titulo, descripcion, estado, fecha_vencimiento, idTarea], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Tarea actualizada' });
  });
});

// Eliminar tarea
app.delete('/tareas/:idTarea', (req, res) => {
  const { idTarea } = req.params;
  db.query('DELETE FROM Tareas WHERE idTarea = ?', [idTarea], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Tarea eliminada' });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
