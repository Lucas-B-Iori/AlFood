import { AppBar, Container, Toolbar, Typography, Box, Button, Paper, Link } from "@mui/material"
import { Outlet, Link as RouterLink } from "react-router-dom"

const NavegacaoAdministracao = () => {
    return (
        <>
            <AppBar position='static'>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white'}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white'}}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, color: 'white'}}>
                                    Pratos
                                </Button>
                            </Link>
                            
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, color: 'white'}}>
                                    Novo Prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1}}>
                    <Paper sx={{ p: 2}}>
                        {/*Conteudo da pag*/}
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default NavegacaoAdministracao