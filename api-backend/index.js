import cors from 'cors';
import express from 'express';
import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(express.json());

const config = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  server: process.env.SQLSERVER_HOST,
  port: parseInt(process.env.SQLSERVER_PORT, 10) || 1433,
  database: process.env.SQLSERVER_DB,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input('pIdUsuario', sql.NVarChar(50), usuario)
      .input('pClave', sql.NVarChar(10), password)
      .execute('sp_ValidarUsuario');
    if (result.recordset && result.recordset.length > 0) {
      // Suponiendo que el SP retorna NombreEmpleado
      res.json({ NombreEmpleado: result.recordset[0].NombreEmpleado });
    } else {
      res.json({ error: 'Datos incorrectos' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error de conexión', details: err.message });
  } finally {
    await sql.close();
  }
});

const PORT = parseInt(process.env.EXPRESS_PORT, 10) || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API backend escuchando en puerto ${PORT} (todas las interfaces)`);
});
