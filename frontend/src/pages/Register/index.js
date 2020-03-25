import React, {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'
export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWathsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUF] = useState('')
    
    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()

        // console.log({
        //     name,
        //     email,
        //     whatsapp,
        //     city,
        //     uf,
        // })

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        try{
            const response  = await api.post('ongs',data) // o axios ja envia em formato JSON , pode enviar a "data" assim msm 
            //Lembrando que a "response" da chamda acima é a ID (Veja no Insomnia ONGS> CREATE) , por isso abaixo conseguiremos retornar a id da ONG
            alert(`Seu ID de acesso: ${response.data.id}`) // data é o resultado da resposta e id é o valor que vc quer 

            history.push('/')
        }catch(err){
            alert('Erro mo cadastro , tente novamente')
        }
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        Voltar para o Logon
                        <FiArrowLeft size={16} color="#E02041"/>
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />


                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />


                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWathsapp(e.target.value)}
                        />


                    <div className="input-group">
                    <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />


                    <input 
                        placeholder="UF" 
                        style={{width: 80}}
                        value={uf}
                        onChange={e => setUF(e.target.value)}
                        />
                    
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}