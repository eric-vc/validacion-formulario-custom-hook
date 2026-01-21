import { useFormulario } from './UseFormulario';
import './RegistroForm.css';
export function RegistroForm() {
  const validadores = {
    nombre: (valor) => {
      if (!valor) return 'El nombre es requerido';
      if (valor.length < 3) return 'Mínimo 3 caracteres';
      return null;
    },
    email: (valor) => {
      if (!valor) return 'El email es requerido';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(valor)) return 'Email inválido';
      return null;
    },
    contraseña: (valor) => {
      if (!valor) return 'La contraseña es requerida';
      if (valor.length < 8) return 'Mínimo 8 caracteres';
      if (!/[A-Z]/.test(valor)) return 'Debe tener una mayúscula';
      if (!/[0-9]/.test(valor)) return 'Debe tener un número';
      return null;
    }
  };
  const form = useFormulario(
    { nombre: '', email: '', contraseña: '' },
    validadores,
    (datos) => {
      console.log('Datos enviados:', datos);
      alert(' Registro exitoso!');
    }
  );
  const tieneErrores = Object.keys(form.errores).length > 0;
  return (
    <div className="form-container">
      <h2>Crear Cuenta</h2>
      {form.enviado && (
        <div className="success-message">
           Registro completado correctamente!
        </div>
      )}
      <form onSubmit={form.handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.valores.nombre}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={form.errores.nombre ? 'error' : ''}
          />
          {form.tocados.nombre && form.errores.nombre && (
            <span className="error-message">{form.errores.nombre}
</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.valores.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={form.errores.email ? 'error' : ''}
          />
          {form.tocados.email && form.errores.email && (
            <span className="error-message">{form.errores.email}
</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña *</label>
          <input
            id="contraseña"
            name="contraseña"
            type="password"
            value={form.valores.contraseña}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            className={form.errores.contraseña ? 'error' : ''}
          />
          {form.tocados.contraseña && form.errores.contraseña && 
(
            <span className="error-message">
{form.errores.contraseña}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={tieneErrores}
          className="btn-submit"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
export default RegistroForm;