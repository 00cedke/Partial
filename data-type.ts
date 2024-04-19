import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('data user is -> %d!');
});

app.get('/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
});

app.post('/hello', (req: Request, res: Response) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
