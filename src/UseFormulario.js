import { useState } from 'react';
export function useFormulario(inicial, validadores, onSubmit) {
const [valores, setValores] = useState(inicial);
const [errores, setErrores] = useState({});
const [tocados, setTocados] = useState({});
const [enviado, setEnviado] = useState(false);
const validar = (valores) => {
const nuevosErrores = {};
Object.keys(validadores).forEach(campo => {
      const error = validadores[campo](valores[campo]);
      if (error) nuevosErrores[campo] = error;
    });
    return nuevosErrores;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({ ...prev, [name]: value }));
    if (tocados[name]) {
      const err = validadores[name](value);
      setErrores(prev => ({
        ...prev,
        [name]: err || undefined
      }));
    }
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTocados(prev => ({ ...prev, [name]: true }));
    const err = validadores[name](valores[name]);
    setErrores(prev => ({
      ...prev,
      [name]: err || undefined
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar(valores);
    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
      onSubmit(valores);
      setTimeout(() => {
        setValores(inicial);
        setErrores({});
        setTocados({});
        setEnviado(false);
      }, 2000);
    } else {
      setErrores(nuevosErrores);
    }
  };
  return {
    valores,
    errores,
    tocados,
    enviado,
    handleChange,
    handleBlur,
    handleSubmit
  };
}