import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { TextField, Button } from '@mui/material'

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const buscaRestaurantes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const restauranteBuscado = restaurantes.filter(restaurante => restaurante.nome.includes(nomeRestaurante))
    setRestaurantes([...restauranteBuscado])
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [nomeRestaurante])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={(e) => buscaRestaurantes(e)}>
      <TextField 
        value={nomeRestaurante} 
        onChange={(e) => setNomeRestaurante(e.target.value)} 
        id="standard-basic" 
        label="Nome do Restaurante" 
        variant="standard"  
      />
      <Button type='submit' variant="outlined">Buscar</Button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </button>}
  </section>)
}

export default ListaRestaurantes