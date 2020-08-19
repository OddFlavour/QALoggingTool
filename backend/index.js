const express = require('express');

const app = express();

// Routes
app.use('/api/templates', require('./api/templates'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
