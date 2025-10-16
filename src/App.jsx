import { useEffect, useState } from "react";
import './style.css'


export default function App() {

  const [viewCreate, setViewCreate] = useState(false)
  const [viewRead, setViewRead] = useState(false)
  const [viewUpdate, setViewUpdate] = useState(false)
  const [viewDelete, setViewDelete] = useState(false)

  const [name, setName] = useState('')
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const [grabID, setGrabID] = useState('')
  const [productLoaded, setProductLoaded] = useState(false)

  const API_URL = 'https://mern-crud-demo.onrender.com' || 'http://localhost:5000';

  const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/api/products`)
    const data = await response.json()

    if (response.ok) {
      setProducts(data)
      setLoading(false)
    } else {
      alert('Failed to fetch data')
      console.log(response.error)
    }
  }

  useEffect(() => {
    if (viewRead) {
      fetchProducts()
    }
  }, [viewRead])

  const fetchID = async (id) => {
    const response = await fetch(`${API_URL}/api/products/${id}`)
    const data = await response.json()

    if (response.ok) {
      setName(data.name)
      setQty(data.qty)
      setPrice(data.price)
      setProductLoaded(prev => !prev)
    }

  }

  const handlFetchID = (e) => {
    e.preventDefault()
    if (!grabID) {
      return alert('Enter an ID so we can update it')
    }
    fetchID(grabID)
  }

  const handleUpdateData = async (e) => {
    e.preventDefault()
    const response = await fetch(`${API_URL}/api/products/${grabID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        qty: Number(qty),
        price: Number(price)
      })
    })
    const data = await response.json()

    if (response.ok) {
      alert(`Product updated : ${data.name}`)
      setName('')
      setQty('')
      setPrice('')
      setProductLoaded(false)
    } else {
      alert(`Product update failed`)
    }
  }

  const handleDeleteData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${grabID}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (response.ok) {
        alert(`product deleted ${data.name}`)
        setGrabID('')
      }
    } catch (error) {
      console.log('error in deleting: ', error)
    }

  }

  const handleDeleteRequest = (e) => {
    e.preventDefault()
    if (!grabID) {
      return alert('Enter an ID so we can update it')
    }
    handleDeleteData()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !qty || !price) {
      return alert('Enter all three values before submiting')
    }

    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          qty: Number(qty),
          price: Number(price)
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`product created : ${data.name}`)
        setName('')
        setQty('')
        setPrice('')
        setViewCreate(false)
      }

    } catch (error) {
      console.log("error in fetch : ", error)
    }
  }

  const handleCreate = () => {
    setViewCreate(prev => !prev)
    setViewRead(false)
    setViewUpdate(false)
    setViewDelete(false)
  }

  const handleRead = () => {
    setViewRead(prev => !prev)
    setViewCreate(false)
    setViewUpdate(false)
    setViewDelete(false)
  }

  const handleUpdate = () => {
    setViewUpdate(prev => !prev)
    setViewCreate(false)
    setViewRead(false)
    setViewDelete(false)
  }

  const handleDelete = () => {
    setViewDelete(prev => !prev)
    setViewCreate(false)
    setViewRead(false)
    setViewUpdate(false)
  }

  return (
    <>
      <div className="data_box" >

        <div className="civility-message">
          <p>👋 Welcome! Please be respectful and avoid using abusive language. Thank you for keeping this space friendly! Im using a free server so the loading time might take a few mins for the first fetch :( </p>
        </div>

        <div className="opration_controller">
          <button type="button" className="btn" onClick={handleCreate}>Create</button>
          <button type="button" className="btn" onClick={handleRead}>Read</button>
          <button type="button" className="btn" onClick={handleUpdate}>Update</button>
          <button type="button" className="btn" onClick={handleDelete}>Delete</button>
        </div>

        {viewCreate && (<form className="form_box" onSubmit={handleSubmit}>

          <div className="box">
            <h1 id="heading">Name</h1>
            <input id="input_box" type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="box">
            <h1 id="heading">Quantity</h1>
            <input id="input_box" type="text" value={qty} onChange={e => setQty(e.target.value)} />
          </div>

          <div className="box">
            <h1 id="heading">Price</h1>
            <input id="input_box" type="text" value={price} onChange={e => setPrice(e.target.value)} />
          </div>

          <button className="btn" type="submit">Submit</button>

        </form>)}

        {viewRead && (
          <div className="read_box">
            {loading ? (<p>loading</p>) :
              products.length === 0 ? (<p>no products found</p>) :
                (<table border="1">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.qty}</td>
                        <td>{product.price}</td>
                        <td>{product._id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>)
            }
          </div>
        )}
        {viewUpdate && (
          <div className="update_box">
            {!productLoaded ? (
              <form className="update_ID_box" onSubmit={handlFetchID}>
                <h1>Enter ID to update</h1>
                <input type="text" value={grabID} onChange={e => setGrabID(e.target.value)} />
                <button className="btn" type="submit">Submit</button>
              </form>
            ) : (
              <form className="update_form" onSubmit={handleUpdateData}>

                <div className="box">
                  <h1 id="heading">Name</h1>
                  <input id="input_box" type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="box">
                  <h1 id="heading">Quantity</h1>
                  <input id="input_box" type="text" value={qty} onChange={e => setQty(e.target.value)} />
                </div>

                <div className="box">
                  <h1 id="heading">Price</h1>
                  <input id="input_box" type="text" value={price} onChange={e => setPrice(e.target.value)} />
                </div>

                <button className="btn" type="submit">Submit</button>

              </form>
            )}


          </div>)

        }
        {viewDelete && (
          <div className="delete_box">
            {!productLoaded ? (
              <form className="delete_ID_box" onSubmit={handleDeleteRequest}>
                <h1>Enter ID to delete</h1>
                <input type="text" value={grabID} onChange={e => setGrabID(e.target.value)} />
                <button className="btn" type="submit">Submit</button>
              </form>) :
              (
                <div className="delete_successful">
                  <h2>Product deleted !</h2>
                  <button type="button" className="btn" onClick={() => { setProductLoaded(false) }}>Delete another</button>
                </div>
              )
            }
          </div>
        )}
      </div>
    </>
  )
}
