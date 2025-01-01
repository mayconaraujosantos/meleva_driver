import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../apidoc.json';

import routes from '@/main/routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api`, routes);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
