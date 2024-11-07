const express = require('express');
const app = express();
const cors=require('cors');
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const InterviewRoutes = require("./routes/InterviewRoutes");
const dbConnect=require('./database/database');
dbConnect()

const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use('/api', userRoutes);
app.use('/task',taskRoutes);
app.use("/api/", InterviewRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
