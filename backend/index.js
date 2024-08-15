const express = require('express');
const cors = require('cors');
const leadsRoutes = require('./routes/leads.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
