import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'Yup'
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({cliente, cargando}) => {
      const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
               .min(3, 'El Nombre es muy corto')
               .max(20, 'El Nombre es muy largo')
               .required('El Nombre es Obligatorio'),
    empresa:Yup.string()
               .required('El Nombre de la empresa es obligatorio'),
    email:  Yup.string()
               .email('Email no válido')
               .required('El email es obligatorio'),
    tel:    Yup.number()
               .positive('Número no válido')
               .integer('Número no válido')
               .typeError('El número no es válido'), 
    
  })

  const handlSubmit = async (valores ) =>{
    try { 
            let respuesta
           if(cliente.id){
                  // Editando un registro
                  const url = `http://localhost:4000/clientes/${cliente.id}`
                  respuesta = await fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(valores),
                        headers: {
                              'Content-Type' : 'application/json'
                        }
                  })

           }else{
                  // Nuevo registro
                  const url = 'http://localhost:4000/clientes'
                  respuesta = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(valores),
                        headers: {
                              'Content-Type' : 'application/json'
                        }
                  })
           }
            await respuesta.json()
            navigate('/clientes')

    } catch (error) {
            console.log(error)
    }
  }
  return (
      cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                  <h1 
                        className="text-gray-600 font-bold text-xl uppercase                   text-center">{cliente?.nombre ? 'Editar CLiente' : 'Agregar Cliente'}
                  </h1>
                  <Formik 
                  initialValues={{
                        nombre:  cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email:   cliente?.email ?? "",
                        tel:     cliente?.tel ?? "",
                        notas:   cliente?.notas ?? "",
                        }}
                        enableReinitialize={true}
                  onSubmit={ async(values, {resetForm}) =>{
                              await handlSubmit(values)

                  resetForm()

                  }}
                  validationSchema={nuevoClienteSchema}

                  >
                  {({errors, touched}) =>{
                  return (
                        <Form
                        className="mt-10" 
                        >
                              <div className="mb-4">
                              <label 
                                    className="text-gray-800"
                                    htmlFor="nombre"
                              >Nombre:</label>
                              <Field
                                    id="nombre"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                                    placeholder="Nombre del Cliente"
                                    name="nombre"
                              />
                              {errors.nombre && touched.nombre ? (
                                    < Alerta> {errors.nombre}</Alerta>
                              ) : null }
                              
                              </div>
                              <div className="mb-4">
                              <label 
                                    className="text-gray-800"
                                    htmlFor="empresa"
                              >Empresa:</label>
                              <Field
                                    id="empresa"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                                    placeholder="Empresa del Cliente"
                                    name="empresa"
                              />
                              {errors.empresa && touched.empresa ? (
                                    < Alerta> {errors.empresa}</Alerta>
                              ) : null }
                              </div>
                              <div className="mb-4">
                              <label 
                                    className="text-gray-800"
                                    htmlFor="email"
                              >E-mail:</label>
                              <Field
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                                    placeholder="Email del CLiente"
                                    name="email"
                              />
                              {errors.email && touched.email ? (
                                    < Alerta> {errors.email}</Alerta>
                              ) : null }
                              </div>
                              <div className="mb-4">
                              <label 
                                    className="text-gray-800"
                                    htmlFor="tel"
                              >Teléfono:</label>
                              <Field
                                    id="tel"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                                    placeholder="Teléfono del Cliente"
                                    name="tel"
                              />
                              {errors.tel && touched.tel ? (
                                    < Alerta> {errors.tel}</Alerta>
                              ) : null }
                              </div>
                              <div className="mb-4">
                              <label 
                                    className="text-gray-800"
                                    htmlFor="notas"
                              >Notas:</label>
                              <Field
                                    as="textarea"
                                    id="notas"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 rounded-md h-40"
                                    placeholder="Notas del Cliente"
                                    name="notas"
                              />
                              </div>
                              <input 
                              type="submit" 
                              value={cliente?.nombre ? 'Editar CLiente' : 'Agregar Cliente'}
                              className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md"
                              />
                        </Form> )}}
                  </Formik>

            </div>
      )
  )
}
Formulario.defaultProps= {
      cliente:{},
      cargando: false
}

export default Formulario