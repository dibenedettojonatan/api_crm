import{ useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handlEliminar}) => {
    const navigate = useNavigate()

    const { nombre, empresa, email, tel, notas, id  } = cliente
  return (
    <tr className='border-b hover:bg-gray-50'>
        <td className="p-3">{nombre}</td>
        <td className="p-3">
            <p><span className="text-gray-800 uppercase font-bold">Email:</span>{email}</p>
            <p><span className="text-gray-800 uppercase font-bold">Tel:</span>{tel}</p>
            
        </td>
        <td className="p-3">{empresa}</td>
        <td className="p-3">

             <button
                className="bg-yellow-400
                       hover:bg-yellow-500
                        block w-full 
                       text-white uppercase p-2 rounded-sm font-bold text-xs"
                type="button"
                onClick={() => navigate(`/clientes/${id}`)}
                > 
                Ver
            </button>
            <button
                className="bg-blue-600
                       hover:bg-blue-700
                        block w-full 
                       text-white uppercase p-2 rounded-sm font-bold text-xs mt-3"
                type="button"
                onClick={() => navigate(`/clientes/editar/${id}`)}
                >
                Editar
            </button>
             <button
                className="bg-red-600
                        hover:bg-red-700
                          block w-full 
                        text-white uppercase p-2 rounded-sm font-bold text-xs mt-3 "
                type="button"
                onClick={() => handlEliminar(id)}
              >
                Eliminar
            </button>
        </td>
    </tr>
  )
}

export default Cliente