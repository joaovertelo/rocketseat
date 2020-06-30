

interface User {
    name: string;
    email?: string;
    senha: number;
    techs: Array<string | number>;
}


export default function createUser({name, email, senha, techs}: User) {

    const user: User = {
        name,
        email,
        senha,
        techs
    }

    return user;
}