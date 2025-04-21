import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClientesRestaurantes from "../../services/apiClientes";


function Cadastro() {

  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      //trim() - remove os espaços em branco do começo e do final da string e impedir que o usuário coloque espaços em branco no campo de nome e email
      const name = nameRef.current.value.trim()
      const email = emailRef.current.value.trim()
      const password = passwordRef.current.value;

      //verifica se os campos estão preenchidos
      if (!name || !email || !password) {
        alert("Preencha todos os campos")
        return
      }

      //verifica se o email é válido
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValido) {
        alert("Digite um e-mail válido");
        return;
      }

      console.log(name, email)




      const response = await apiClientesRestaurantes.post('/users/register', {
        name,
        email,
        password
      });



      alert("Usuário cadastrado com sucesso")
      navigate('/login')


    } catch (error) {
      //verifica se o servidor retornou um erro 409 (conflito) usado para indicar dados duplicados ou em conflito com o que já existe no banco de dados
      //exemplo: email já cadastrado
      if (error.response?.status === 409) {
        alert("Email já cadastrado")

        //se nao for erro 409 verifica se o servidor retornou um erro 400 (bad request) usado para indicar que a requisição não pode ser processada devido a dados inválidos ou malformados
        //exemplo: senha muito curta ou email inválido
      } else if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert("Erro desconhecido")
      }
      console.error(error);

    }

  }


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 overflow-y-hidden " >
      <h1 className="font-bold text-2xl tracking-[.10em] text-red-800">CADASTRE-SE</h1>
      <form onSubmit={handleSubmit}
        //enviar os dados para o back-end 
        className="flex flex-col gap-5 mt-4 min-w-150 border-red-800 border-2 rounded-lg p-5 bg-red shadow-lg ">

        <div className="mt-5">
          <h6 className="font-medium text-2xl">Bem-vindo cliente!</h6>
          <h2 className="font-medium text-gray-600">Digite seus dados pessoais.</h2>
        </div>

        <input type="text" placeholder="Nome"
          ref={nameRef}
          className="outline-0 border-gray-400 border-2 rounded-lg p-2 placeholder-gray-400 placeholder:font-medium" />

        <input type="text" placeholder="Email"
          ref={emailRef}
          className="outline-0 border-gray-400 border-2 rounded-lg p-2 placeholder-gray-400 placeholder:font-medium" />

        <input type="password" placeholder="Senha"
          ref={passwordRef}
          className="outline-0 border-gray-400 border-2 rounded-lg p-2 placeholder-gray-400 placeholder:font-medium" />

        <div className="flex flex-row gap-2 justify-between ml-2 mr-2">
          <p>Já tem uma conta?
            <a href="/login" className="text-red-800 underline font-bold">
              Faça login
            </a>
          </p>
        </div>

        <button type="submit"
          className="bg-red-800 rounded-md text-white min-h-15 mt-5 mb-5">CONFIRMAR</button>

      </form>

    </div>
  )
}
export default Cadastro;