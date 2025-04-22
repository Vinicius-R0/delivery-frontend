import { useEffect, useState } from 'react'
import './style.css'
import api from '../../services/api-cardapio'

function Register() {

  const [dishes, setDishes] = useState([])

  async function getDishes() {
    const dishesFromApi = await api.get('/dishes')

    setDishes(dishesFromApi.data)
  }
  useEffect(() => {
    getDishes()
  }, [])

  return (
    <>
      <div className='container'>
        <form action="">
          <h1>Cadastro de Pratos</h1>
          <input type="text" name="name" placeholder='Nome'/>
          <input type="text" name="category" placeholder='Categoria'/>
          <input type="number" name="price" placeholder='Preço'/>
          <button type="button">Cadastrar</button>
        </form>

        <div className='card'>
          <div>
            <p>Nome:</p>
            <p>Categoria:</p>
            <p>Preço:</p>
          </div>
          <button>Deletar</button>
        </div>

        {
          dishes.map((dish) => (
            <div className='card' key={dish.id}>
              <h2>{dish.name}</h2>
              <p>{dish.category}</p>
              <p>{dish.price}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Register
