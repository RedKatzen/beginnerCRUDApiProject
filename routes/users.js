import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [
    {
        primeiroNome: 'John',
        ultimoNome: 'Doe',
        email: 'johndoe@gmail.com',
        id: uuidv4()
    },
    {
        primeiroNome: 'Jane',
        ultimoNome: 'Smith',
        email: 'alicesmith@gmail.com',
        id: uuidv4()
    },
]

router.get('/', (req, res) => {
    res.send(users);
})

router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.primeiroNome} adicionado ao banco de dados!`);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`Usuário de ${id} foi deletado`);
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;

    const { primeiroNome, ultimoNome, email } = req.body;

    const user = users.find((user) => user.id === id);

    if(primeiroNome) user.primeiroNome = primeiroNome;
    if(ultimoNome) user.ultimoNome = ultimoNome;
    if(email) user.email = email;

    res.send(`Usuário de ID ${id} teve seus dados alterados`)
})

export default router;