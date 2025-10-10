import { useState, useEffect } from 'react';

export default function FormularioProducto({ onSubmit, form, setForm }) {
  // 1. ESTADOS PARA VALIDACIONES
  const [errores, setErrores] = useState({});
  const [campoModificado, setCampoModificado] = useState({});

  // 2. VALIDACIÓN EN TIEMPO REAL
  useEffect(() => {
    const nuevosErrores = {};

    // Validar NOMBRE
    if (campoModificado.nombre) {
      if (!form.nombre?.trim()) {
        nuevosErrores.nombre = 'El nombre es requerido';
      } else if (form.nombre.trim().length < 2) {
        nuevosErrores.nombre = 'Mínimo 2 caracteres';
      }
    }

    // Validar PRECIO
    if (campoModificado.precio) {
      if (!form.precio) {
        nuevosErrores.precio = 'El precio es requerido';
      } else if (parseFloat(form.precio) <= 0) {
        nuevosErrores.precio = 'Debe ser mayor a 0';
      }
    }

    // Validar DESCRIPCIÓN
    if (campoModificado.descripcion) {
      if (!form.descripcion?.trim()) {
        nuevosErrores.descripcion = 'La descripción es requerida';
      } else if (form.descripcion.trim().length < 10) {
        nuevosErrores.descripcion = 'Mínimo 10 caracteres';
      }
    }

    // 3. CAMPOS ADICIONALES - CATEGORÍA
    if (campoModificado.categoria) {
      if (!form.categoria) {
        nuevosErrores.categoria = 'Selecciona una categoría';
      }
    }

    // 4. CAMPOS ADICIONALES - STOCK
    if (campoModificado.stock) {
      if (!form.stock) {
        nuevosErrores.stock = 'El stock es requerido';
      } else if (parseInt(form.stock) < 0) {
        nuevosErrores.stock = 'No puede ser negativo';
      }
    }

    setErrores(nuevosErrores);
  }, [form, campoModificado]);

  // 5. MANEJAR CAMBIOS EN TIEMPO REAL
  const manejarCambio = (campo, valor) => {
    setForm({ ...form, [campo]: valor });                    // Actualiza el valor
    setCampoModificado({ ...campoModificado, [campo]: true }); // Marca como modificado
  };

  // 6. ENVIAR FORMULARIO
  const manejarSubmit = () => {
    const todosLosCamposModificados = {
      nombre: true, precio: true, descripcion: true, 
      categoria: true, stock: true  // Incluye campos adicionales
    };
    setCampoModificado(todosLosCamposModificados);

    const hayErrores = Object.values(errores).some(error => error);
    const formCompleto = form.nombre && form.precio && form.descripcion && 
                         form.categoria && form.stock;  // Incluye campos adicionales

    if (!hayErrores && formCompleto) {
      onSubmit();
    }
  };

  const esFormularioValido = !Object.values(errores).some(error => error) && 
    form.nombre && form.precio && form.descripcion && 
    form.categoria && form.stock;  // Incluye campos adicionales

  return (
    <div className="space-y-6">
      {/* CAMPO ORIGINAL - Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Producto
        </label>
        <input 
          type="text" 
          placeholder="Ej: MacBook Pro 16"
          value={form.nombre || ''}
          onChange={(e) => manejarCambio('nombre', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errores.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errores.nombre && <p className="text-red-600 text-sm mt-1">{errores.nombre}</p>}
      </div>

      {/* CAMPO ORIGINAL - Precio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
        <input 
          type="number" 
          placeholder="0.00"
          value={form.precio || ''}
          onChange={(e) => manejarCambio('precio', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errores.precio ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errores.precio && <p className="text-red-600 text-sm mt-1">{errores.precio}</p>}
      </div>

      {/* CAMPO ORIGINAL - Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
        <textarea 
          placeholder="Describe el producto..."
          value={form.descripcion || ''}
          onChange={(e) => manejarCambio('descripcion', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
            errores.descripcion ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          rows="3"
        />
        {errores.descripcion && <p className="text-red-600 text-sm mt-1">{errores.descripcion}</p>}
      </div>

      {/* CAMPO ADICIONAL 1 - Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
        <select 
          value={form.categoria || ''}
          onChange={(e) => manejarCambio('categoria', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errores.categoria ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        >
          <option value="">Selecciona una categoría</option>
          <option value="electronica">Electrónica</option>
          <option value="ropa">Ropa</option>
          <option value="hogar">Hogar</option>
          <option value="deportes">Deportes</option>
        </select>
        {errores.categoria && <p className="text-red-600 text-sm mt-1">{errores.categoria}</p>}
      </div>

      {/* CAMPO ADICIONAL 2 - Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Disponible</label>
        <input 
          type="number" 
          placeholder="0"
          value={form.stock || ''}
          onChange={(e) => manejarCambio('stock', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errores.stock ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          min="0"
        />
        {errores.stock && <p className="text-red-600 text-sm mt-1">{errores.stock}</p>}
      </div>

      <button 
        onClick={manejarSubmit}
        disabled={!esFormularioValido}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all ${
          esFormularioValido ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {esFormularioValido ? 'Guardar Producto' : 'Completa todos los campos'}
      </button>
    </div>
  );
}