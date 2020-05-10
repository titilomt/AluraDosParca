import React, { useState, useEffect, Fragment } from 'react'
import {
    SafeAreaView,
    FlatList,
    StatusBar,
    Platform
} from "react-native"
import { Cabecalho } from '../../Components/Cabecalho'
import { Foto } from '../../Components/Foto'
import { Comentarios } from '../../Components/Comentarios'
import lerFotos from '../../api/feed'
import { curtirFoto, imgLike } from '../../api/curtidas'
import adicionarComentario from '../../api/comentario'

export default function Feed({ navigation }) {
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        lerFotos(setFotos);
    }, [])

    return (
        <SafeAreaView>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
            <FlatList
                data={fotos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <Fragment>
                        <Cabecalho
                            nomeUsuario={item.userName}
                            urlImage={item.userURL} />
                        <Foto
                            urlFoto={item.url}
                            descricao={item.description}
                            qntLikes={item.likes}
                            imgLike={imgLike}
                            curtirFoto={curtirFoto}
                        />
                        <Comentarios
                            comentarios={item.comentarios}
                            adicionarComentario={adicionarComentario}
                        />
                    </Fragment>}
            />
        </SafeAreaView>
    );
}

Feed.navigationOptions = ({ navigation }) => {
    let opt = {
        title: navigation.getParam("userName")
    }

    if (Platform.OS == "android") opt.header = null

    return opt
}
