import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => {
      setPratos(resposta.data);
    });
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    http
      .delete(`pratos/${pratoASerExcluido.id}/`)
      .then((resposta) => {
        const listaPratos = pratos.filter(
          (prato) => prato.id !== pratoASerExcluido.id
        );
        setPratos([...listaPratos]);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [<a href={prato.imagem} target="blank" rel="noreferrer">Ver Imagem</a>]
              </TableCell>
              <TableCell>
                [{" "}
                <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
