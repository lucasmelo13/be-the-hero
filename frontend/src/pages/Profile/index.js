import React, {useState,useEffect} from 'react'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

export default function Profile(){
    const history = useHistory()
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    //useEffect(() => {}  --> {} serve para indicar qual funçao ira executar  / useEffect(() => {} , [] --> esse segundo parametro é para indicar quando a função sera executada , ou seja todas as informaçoes que estiverm dentro desse array mudarem , ele ira reexecutar recalculando os CASOS
    useEffect(() => {     
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data)
        })
    } , [ongId])// <--- esse valor que esta com o ongID server para recalcular com todos os valores acima , caso haja alguma alterçao

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}` ,{
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id)) // aqui quando um caso for deletado , ele ira atualizar e mostrar someente os casos restantes
        }catch(err){
            alert('Erro ao deletar caso')
        }
    }

    function handleLogout(){
        localStorage.clear()

        history.push('/')
        
    }
    
    return(
        
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    //sempre devemos colocar o valor unico na key que vai identificar cada um desses incidentes , ou seja o id , pois ele protege o valor de qualquer alteraaçao
                    <li key={incident.id}> 
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</p>

                        {/* Tomar cuidado pois na funçao abaxio onClick={()=> handleDeleteIncident(incident.id)} --> vc ira primeiro deletar todos os casos e dai passar o resultado como parametro para o ONCLICK e nao queremos fazer isso */}
                        {/* Por conta disso devemos escrever assim : onClick={()=> handleDeleteIncident(incident.id)} --> usando uma arrow function vc estara retornando uma funçao e nao o retorno de uma */}
                        <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                </li>
                ))}

            </ul>
        </div>
    )
}