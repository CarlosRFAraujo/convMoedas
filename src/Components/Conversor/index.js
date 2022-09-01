import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard} from "react-native";

import api from "../../services/api";

// https://economia.awesomeapi.com.br/last/USD-BRL

class Conversor extends Component {

    constructor(props){
        super(props);
        this.state = {
            moedaA: this.props.moedaA,
            moedaB: this.props.moedaB,
            moedaBValor: 0,
            valorConvertidoMenor: 0,
            valorConvertidoMaior: 0,
        };
        this.converter = this.converter.bind(this)
    }

    async converter() {
        let moedas = this.state.moedaA + '-' + this.state.moedaB;
        const response = await api.get(moedas);
        let cotacaoMenor = response.data.USDBRL.low
        let cotacaoMaior = response.data.USDBRL.high
        let resultadoA = (cotacaoMenor * parseFloat(this.state.moedaBValor))
        let resultadoB = (cotacaoMaior * parseFloat(this.state.moedaBValor))
        this.setState({
            valorConvertidoMenor: resultadoA.toFixed(2),
            valorConvertidoMaior: resultadoB.toFixed(2)
        })
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>{this.props.moedaA} para {this.props.moedaB}</Text>
                <TextInput
                placeholder="Valor a ser convertido"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(moedaBValor) => this.setState({moedaBValor})}
                value={this.state.moedaBValor}
                />
                <TouchableOpacity
                style={styles.btnArea}
                onPress={this.converter}
                >
                    <Text style={styles.btnText}>Converter</Text>
                </TouchableOpacity>
                {this.state.valorConvertidoMenor
                    ? <Text style={styles.convertido}>Cotação comercial: {this.state.valorConvertidoMenor}</Text>
                    : ''
                }
                {this.state.valorConvertidoMaior
                    ? <Text style={styles.convertido}>Cotação paralelo: {this.state.valorConvertidoMaior}</Text>
                    : ''
                }
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 26,
        color: 'red',
        marginBottom: 15,
    },
    input: {
        width: 280,
        height: 45,
        backgroundColor: '#ccc',
        marginBottom: 15,
        fontSize: 22,
        borderRadius: 15,
        textAlign: 'center'
    },
    btnArea: {
        backgroundColor: '#01EB55',
        width: 180,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    btnText: {
        fontSize: 22,
        color: '#F53A02',
    },
    convertido: {
        color: '#F53A02',
        fontSize: 22,
        fontWeight: 'bold',
    }
});

export default Conversor;