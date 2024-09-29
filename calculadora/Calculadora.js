import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'reactive-native'

export default function Calculator() {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [selectedOperation, setSelectedOperation]= useState(null)
    const [result, setResult] = useState(null)

    const calculateResult = () => {
        const num1 = parseFloat(input1)
        const num2 = parseFloat(input2)

        if(!isNaN(num1)&& !isNaN(num2) && selectedOperation){
            const operations = {
            '+': (num1, num2) => num1+num2,
            '-': (num1, num2) => num1-num2,
            '*': (num1, num2) => num1*num2,
            '/': (num1, num2) => (num2 !== 0 ? num1/num2 : "impossivel dividir por zero")
            }

        const operation = operations[selectedOperation]
        const res = operation ? operation(num1, num2): null

        setResult(res)

        }else {
            setResult("Input inválido")
        }
    }

    return(
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.resultText}>
                {result !== null ? result.toString(): 'resultado aqui'}
            </Text>
        </View>

        <TextInput
            style={styles.input}
            placeholder = "Input 1"
            keyboardType = "numeric"
            value= {input1}
            onChangeText={setInput1}
        />

        <View style={styles.buttonRow}>
            <OperationButton operation = "+" onPress={() => setSelectedOperation('+')} />
            <OperationButton operation = "-" onPress={() => setSelectedOperation('-')} />
            <OperationButton operation = "*" onPress={() => setSelectedOperation('*')} />
            <OperationButton operation = "/" onPress={() => setSelectedOperation('/')} />
        </View>

        <TextInput
            style={styles.input}
            placeholder="Input 2"
            keyboardType="numeric"
            value={input2}
            onChangeText={setInput2}
        />

        <Button title = "=" onPress={calculateResult}/>
        </View>
    )
}
const OperationButton = ({operation, onPress}) => (
    <View style={styles.operationButton}>
        <Button title = {operation} onPress ={onPress} />
    </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 4,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
  },
  operationButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});