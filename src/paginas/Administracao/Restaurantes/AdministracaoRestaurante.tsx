import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Link } from 'react-router-dom';
import http from '../../../http';

const AdministracaoRestaurantes = () => {

    const [ restaurantes, setRestaurantes ] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
    }, [])

    const excluir = (restauranteASerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
            .then(resposta => {
                const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id)
                setRestaurantes([...listaRestaurantes])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes