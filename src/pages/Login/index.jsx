import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClientesRestaurantes from "../../services/apiClientes";


function Login() {

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();


    async function handleSubmit(event) {
        event.preventDefault();
        try {
            //trim() - remove os espaços em branco do começo e do final da string e impedir que o usuário coloque espaços em branco no campo de nome e email
            const email = emailRef.current.value.trim()
            //current.value e aonde a informação chega pelo console
            const password = passwordRef.current.value;

            if (!email || !password) {
                alert('Preencha todos os campos')
                return
            }

            //verifica se o email é válido
            const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!emailValido) {
                alert('Digite um e-mail válido')
                return
            }
            //criar ima variavel para receber a resposta do back-end e pegar o token que é gerado no back-end qunadl o usuário faz login esse token é enviado para o front-end e armazenado no localStorage dentro da variavel data
            const  {data}  = await apiClientesRestaurantes.post('/login', {
                email,
                password
            });

            const token = data.token
            localStorage.setItem('token', token)

            console.log('USUARIO LOGADO: ', email,
                'TOKEN GERADO: ', token)

            alert('Login realizado com sucesso')

            
        } catch (error) {
            console.error(error);

        }

    }

    return (
        
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 overflow-y-hidden " >
            <h1 className="font-bold text-2xl tracking-[.10em] text-red-800">LOGIN</h1>
            <form onSubmit={handleSubmit}
                //enviar os dados para o back-end 
                action="/users/register" method="POST" className="flex flex-col gap-5 mt-4 min-w-150 border-red-800 border-2 rounded-lg p-5 bg-red shadow-lg ">
                <div className="mt-5">
                    <h6 className="font-medium text-2xl">Vamos continuar!</h6>
                    <h2 className="font-medium text-gray-600">Digite dados da sua conta.</h2>
                </div>


                <input type="text" placeholder="Email"
                    ref={emailRef}
                    className="outline-0 border-gray-400 border-2 rounded-lg p-2 placeholder-gray-400 placeholder:font-medium" />

                <input type="password" placeholder="Senha"
                    ref={passwordRef}
                    className="outline-0 border-gray-400 border-2 rounded-lg p-2 placeholder-gray-400 placeholder:font-medium" />
                <div className="flex flex-row gap-2 justify-between ml-2 mr-2">
                    <p>não tem uma conta? <a href="/users/register" className="text-red-800 underline font-bold">Cadastre-se</a></p>
                    <p>Esqueceu a senha?</p>
                </div>
                <button type="submit"
                    className="bg-red-800 rounded-md text-white min-h-15 mt-5 mb-5">CONFIRMAR</button>
            </form>

        </div>
    )
}
export default Login;