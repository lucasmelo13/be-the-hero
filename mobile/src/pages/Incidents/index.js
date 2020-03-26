import React, {useState,useEffect} from 'react'
import {Feather} from '@expo/vector-icons'
import { View, FlatList, Image , Text , TouchableOpacity} from 'react-native';
import{useNavigation} from '@react-navigation/native'

import api from '../../services/api'  // vai fazer as chamadas via AXIO para puxar as informaçoes do BACK

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents(){
    const [incidents , setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage]= useState(1)//nao existe página 0
    const[loading,setLoading] = useState(false)
    
    const navigation = useNavigation()
    

    function navigateToDetail(incident){
        navigation.navigate('Detail' ,{incident})
    }    

    async function loadIncidents(){
        if(loading){
            return
        }

        if(total > 0 && incidents.length === total){
            return
        }
        setLoading(true)
        const response = await api.get('incidents', {params:{ page }})
        // console.log(response.data)
        
        
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count']) // se for no header do Insomnia e vai verificar esse nome contabilizando os casos
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(()=>{
        loadIncidents()
    }, [])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold} > {total} casos</Text>.
                </Text>
            </View>
            
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolhas um dos casos abaixo e salve o dia !</Text>
            
            <FlatList 
                
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}//o key extractor vai retornar a informaçao unica de cada um dos 5 incidentes acima 
                // showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} //a funçao loadIncidents executa quando o usuário chegar no final da lista
                onEndReachedThreshold={0.2} // quando ele estiver a 20% do final da lista , ele carregara a nova lista
                renderItem={({ item : incident}) => ( 
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', currency:'BRL' 
                                }).format(incident.value)}</Text>

                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>

              )}
            />
        </View>
    )
}