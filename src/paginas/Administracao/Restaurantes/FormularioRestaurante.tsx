import { TextField, Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';
import { Link as RouterLink } from 'react-router-dom';

const FormularioRestaurante = () => {

    const parametros = useParams()
    const [ nomeRestaurante, setNomeRestaurante ] = useState('')

    useEffect(() => {
        if(parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome)
                })
        }
    }, [parametros])

    
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if(parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(resposta => {
                    alert('Restaurante alterado com sucesso')
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(resposta => {
                    alert('Restaurante cadastrado com sucesso')
                })
        }
        
    }
    
    return (
        <>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                <Typography component='h1' variant='h6'>Formulario de Restaurantes</Typography>
                <Box 
                    sx={{ width: '100%'}}
                    component='form'
                    action="submit" 
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => aoSubmeterForm(e)}
                    >
                    <TextField 
                        value={nomeRestaurante} 
                        onChange={(e) => setNomeRestaurante(e.target.value)} 
                        id="standard-basic" 
                        label="Nome do Restaurante" 
                        variant="standard"
                        fullWidth
                        required
                        />
                    <Button sx={{ marginTop: 1}} type='submit' fullWidth variant="outlined">Salvar</Button>
                </Box>
            </Box>

            
        </>
    )
}

export default FormularioRestaurante