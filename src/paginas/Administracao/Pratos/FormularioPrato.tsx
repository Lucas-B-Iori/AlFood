import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioPrato = () => {
    const [ nomePrato, setNomePrato ] = useState('')
    const [ descricao, setDescricao ] = useState('')

    const [ tag, setTag ] = useState('')
    const [ restaurante, setRestaurante ] = useState('')

    const [ imagem, setImagem ] = useState<File | null>(null)

    const [ tags, setTags ] = useState<ITag[]>([])
    const [ restaurantes, setRestaurantes ] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }
    }
    
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        if(imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert('prato cadastrado com sucesso')
            })
            .catch(erro => console.log(erro))
    }
    
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                <Typography component='h1' variant='h6'>Formulario de Pratos</Typography>
                <Box 
                    sx={{ width: '100%'}}
                    component='form'
                    action="submit" 
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => aoSubmeterForm(e)}
                >
                    <TextField 
                        value={nomePrato} 
                        onChange={(e) => setNomePrato(e.target.value)} 
                        id="standard-basic" 
                        label="Nome do Prato" 
                        variant="standard"
                        fullWidth
                        required
                        margin='dense'
                    />
                    <TextField 
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)} 
                        id="standard-basic" 
                        label="Descrição do Prato" 
                        variant="standard"
                        fullWidth
                        required
                        margin='dense'
                    />

                    <FormControl margin='dense' fullWidth >
                        <InputLabel id='select-tag' >Tag</InputLabel>
                        <Select labelId='select-tag' value={tag} onChange={e => setTag(e.target.value)}>
                            {tags.map(tag => 
                                <MenuItem key={tag.id} value={tag.value}>
                                    {tag.value}
                                </MenuItem>)}
                        </Select>
                    </FormControl> 
                    
                    <FormControl margin='dense' fullWidth >
                        <InputLabel id='select-restaurante' >Restaurante</InputLabel>
                        <Select labelId='select-restaurante' value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                            {restaurantes.map(restaurante => 
                                <MenuItem key={restaurante.id} value={restaurante.id}>
                                    {restaurante.nome}
                                </MenuItem>)}
                        </Select>
                    </FormControl> 

                    <input type="file" onChange={e => selecionarArquivo(e)}/>

                    <Button sx={{ marginTop: 1}} type='submit' fullWidth variant="outlined">Salvar</Button>
                </Box>
            </Box>
        </>
    )
}

export default FormularioPrato