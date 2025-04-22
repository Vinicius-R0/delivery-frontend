import { useRef, useEffect, useState } from 'react'
import './style.css'
import apiDishes from '../../services/api-cardapio'

function Register() {

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      
      const name = nameRef.current.value;
      const category = categoryRef.current.value;
      const price = priceRef.current.value;

      const response = await apiDishes.post('/register_dishes', {
        name,
        category,
        price
      });



      alert("Prato cadastrado com sucesso")
    


    } catch (error) {
      console.error(error);

    }
  const [dishes, setDishes] = useState([])

  async function getDishes() {
    const dishesFromApi = await api.get('/dishes')

    setDishes(dishesFromApi.data)
  }
  useEffect(() => {
    getDishes()
  }, [])

  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de Pratos</h1>
          <input ref={nameRef} type="text" name="name" placeholder='Nome'/>
          <input ref={categoryRef} type="text" name="category" placeholder='Categoria'/>
          <input ref={priceRef} type="number" name="price" placeholder='Preço'/>
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
