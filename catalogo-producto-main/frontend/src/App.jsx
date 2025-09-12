import { useState, useEffect } from 'react'
import api from './services/api'

function App() {
  const [productos, setProductos] = useState([])
  const [form, setForm] = useState({ nombre: '', precio: '', descripcion: '' })
  const [busqueda, setBusqueda] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  const cargarProductos = async () => {
    try {
      console.log('🔄 Cargando productos...')
      const res = await api.get('/products')
      console.log('✅ Productos recibidos:', res.data)
      setProductos(res.data)
    } catch (error) {
      console.error('❌ Error cargando productos:', error)
      // Datos de prueba temporales
      setProductos([
        {id: 1, nombre: "Producto 1", precio: 10.99, descripcion: "Descripción 1"},
        {id: 2, nombre: "Producto 2", precio: 20.50, descripcion: "Descripción 2"},
        {id: 3, nombre: "Producto 3", precio: 15.75, descripcion: "Descripción 3"}
      ])
    }
  }

  const agregarProducto = async () => {
    try {
      console.log('🔄 Intentando agregar producto:', form)
      const response = await api.post('/products', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('✅ Producto agregado:', response.data)
      setForm({ nombre: '', precio: '', descripcion: '' })
      cargarProductos()
    } catch (error) {
      console.error('❌ Error agregando producto:', error)
      console.error('📋 URL:', error.config?.url)
      console.error('🔧 Método:', error.config?.method)
      console.error('📦 Datos enviados:', error.config?.data)
      
      // Mostrar alerta al usuario
      alert('Error al agregar producto. Revisa la consola para más detalles.')
    }
  }

  const eliminarProducto = async (id) => {
    try {
      console.log('🔄 Intentando eliminar producto ID:', id)
      const response = await api.delete(`/products/${id}`)
      console.log('✅ Producto eliminado:', response.data)
      cargarProductos()
    } catch (error) {
      console.error('❌ Error eliminando producto:', error)
      alert('Error al eliminar producto. Revisa la consola para más detalles.')
    }
  }

  const modificarProducto = async (id) => {
    try {
      console.log('🔄 Intentando modificar producto ID:', id, 'con datos:', form)
      const response = await api.put(`/products/${id}`, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('✅ Producto modificado:', response.data)
      setForm({ nombre: '', precio: '', descripcion: '' })
      setEditandoId(null)
      cargarProductos()
    } catch (error) {
      console.error('❌ Error modificando producto:', error)
      alert('Error al modificar producto. Revisa la consola para más detalles.')
    }
  }

  const prepararEdicion = (producto) => {
    console.log('✏️ Preparando edición:', producto)
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion
    })
    setEditandoId(producto.id)
  }

  const cancelarEdicion = () => {
    setForm({ nombre: '', precio: '', descripcion: '' })
    setEditandoId(null)
  }

  useEffect(() => {
    cargarProductos()
  }, [busqueda])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Catálogo de Productos</h1>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 p-2 border w-full rounded"
      />

      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h2 className="text-lg font-semibold mb-2">
          {editandoId ? '✏️ Editar Producto' : '➕ Agregar Producto'}
        </h2>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={form.nombre} 
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} 
          className="p-2 border w-full mb-2 rounded" 
        />
        <input 
          type="number" 
          placeholder="Precio" 
          value={form.precio} 
          onChange={(e) => setForm({ ...form, precio: e.target.value })} 
          className="p-2 border w-full mb-2 rounded" 
        />
        <input 
          type="text" 
          placeholder="Descripción" 
          value={form.descripcion} 
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })} 
          className="p-2 border w-full mb-2 rounded" 
        />
        
        <div className="space-x-2">
          {editandoId ? (
            <>
              <button 
                onClick={() => modificarProducto(editandoId)} 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                💾 Guardar Cambios
              </button>
              <button 
                onClick={cancelarEdicion} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                ❌ Cancelar
              </button>
            </>
          ) : (
            <button 
              onClick={agregarProducto} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ➕ Agregar
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">📋 Lista de Productos</h2>
        <ul>
          {productos.map(p => (
            <li key={p.id} className="border p-4 mb-3 rounded bg-white shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{p.nombre}</h3>
                  <p className="text-green-600 font-semibold">${p.precio}</p>
                  <p className="text-sm text-gray-600 mt-1">{p.descripcion}</p>
                  <span className="text-xs text-gray-400">ID: {p.id}</span>
                </div>
                <div className="space-x-2">
                  <button 
                    onClick={() => prepararEdicion(p)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    ✏️ Modificar
                  </button>
                  <button 
                    onClick={() => eliminarProducto(p.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App