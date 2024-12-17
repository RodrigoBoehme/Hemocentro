const readline = require('readline-sync')

function formatDate(dDate, sMode) {
    var today = dDate;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (sMode + "" == "") {
        sMode = "dd/mm/yyyy";
    }
    if (sMode == "yyyy-mm-dd") {
        return yyyy + "-" + mm + "-" + dd + "";
    }
    if (sMode == "dd/mm/yyyy") {
        return dd + "/" + mm + "/" + yyyy;
    }
    if (sMode == "yyyymmdd") {
        return yyyy.toString() + mm.toString() + dd.toString()
    }

}

function dataHue(input) {

    if (input.includes('/')) {
        today = input.split('/')
        dd = today[0]
        mm = today[1]
        yyyy = today[2]
        return mm + '/' + dd + '/' + yyyy
    }
    else if (input.includes('-')) {
        today = input.split('-')
        dd = today[0]
        mm = today[1]
        yyyy = today[2]
        return mm + '/' + dd + '/' + yyyy

    }
    else if (input.includes('|')) {
        let today = input.split('|')
        dd = today[0]
        mm = today[1]
        yyyy = today[2]
        return mm + '/' + dd + '/' + yyyy

    }

    //   let today=input.split('/'||'-'||'|')
    //   let dd=today[0]
    //   let mm=today[1]
    //   let yyyy=today[2]
}



datas = []


i = 0
cadastroCliente = []
tipoSanguineo = ['A', 'B', 'AB', 'O']//nome dos tipos
antigenoD = ['+', '-']//se é positivo ou negativo


function cadastro() {
    paciente = {}
    paciente.id = i + 1

    console.clear()
    paciente.nome = readline.question(`Qual o Nome do paciente:`)
    console.clear()

    paciente.tipoSanguineo = readline.questionInt((`Qual o Tipo Sanguineo do paciente?\n\n1. A\n2. B\n3. AB\n4. O\n\nDigite o numero correspondente: `))
    console.clear()

    if (paciente.tipoSanguineo > 4 || paciente.tipoSanguineo < 1) {
        readline.question(`Opcao Invalida...`)
        return
    }

    paciente.positividade = readline.questionInt('O sangue e positivo?\n\n1. Sim\n2. Nao\n\nDigite o Numero correspondente: ')
    console.clear()

    if (paciente.positividade > 2 || paciente.positividade < 1) {
        readline.question(`Opcao Invalida...`)
        return
    }

    const dataISO = new Date(dataHue(readline.question(`Informe a data: `)))
    // formatDate(dataISO,'dd/mm/yyyy')
    paciente.data = dataISO
    if (paciente.data == 'Invalid Date') {
        paciente.data = new Date
    }
    cadastroCliente.push(paciente)
    //console.log(cadastroCliente[i])

    i++
}

function verPaciente() {
    if (cadastroCliente.length > 0) {
        console.clear
        console.log('-------------------------------------------------------------------------------------------------------------------')
        console.log(`| IDs    | Nome                          |Data Cadastro         | Tipo Sanguineo                                 | `)
        console.log('------------------------------------------------------------------------------------------------------------------')
        for (let a = 0; a < cadastroCliente.length; a++) {

            console.log(`|  ${(cadastroCliente[a].id).toString().padEnd(6)}| ${(cadastroCliente[a].nome).padEnd(30)}| ${formatDate(cadastroCliente[a].data, 'dd/mm/yyyy').padEnd(21)}| ${(tipoSanguineo[cadastroCliente[a].tipoSanguineo - 1] + antigenoD[cadastroCliente[a].positividade - 1]).padEnd(47
            )}|`)
        }
        console.log('------------------------------------------------------------------------------------------------------------------')
    } else {
        console.log(`Nao ha pessoas registradas`)
    }
}

function pacienteTipoSangue() {
    arrayTipo = []
    arrayAntigeno = []
    let opcaoTipo;
    let opcaoAntingeno;

    if (cadastroCliente.length > 0) {
        console.log(`Escolha um tipo de Sangue:`)
        for (let i = 0; i < tipoSanguineo.length; i++) {
            console.log(`${i + 1}. ${tipoSanguineo[i]}`)
        }
        opcaoTipo = readline.questionInt(`Escolha um Numero: `)
        console.clear()
        if (opcaoTipo > 4 || opcaoTipo < 0) {
            readline.question(`Opcao Invalida...`)
            return
        }

        opcaoAntingeno = readline.questionInt('Positivo ou Negativo?\n\n1. Positivo\n2. Negativo\nEscolha um numero: ')
        console.clear()
        if (opcaoAntingeno > 2 || opcaoAntingeno < 0) {
            readline.question(`Opcao Invalida...`)
            return
        }


        for (let i = 0; i < cadastroCliente.length; i++) {
            if (cadastroCliente[i].positividade == opcaoAntingeno) {
                arrayAntigeno.push(cadastroCliente[i])
            }
        }
        for (let i = 0; i < arrayAntigeno.length; i++) {
            if (arrayAntigeno[i].tipoSanguineo == opcaoTipo) {
                arrayTipo.push(arrayAntigeno[i])
            }
        }
        if (arrayTipo.length > 0) {
            console.clear()
            console.log(`Pessoas com o sangue ${tipoSanguineo[opcaoTipo - 1]}${antigenoD[opcaoAntingeno - 1]}`)
            console.log('-------------------------------------------------------------------------------------------------------------------')
            for (let a = 0; a < arrayTipo.length; a++) {
                // console.log(`${i+1}. ${arrayTipo[i].nome} Data cadastro:${formatDate(cadastroCliente[i].data,'dd/mm/yyyy')}, Tipo Sanguineo:${tipoSanguineo[cadastroCliente[i].tipoSanguineo-1]}${antigenoD[cadastroCliente[i].positividade-1]}`)

                console.log(`| ID: ${(cadastroCliente[a].id).toString().padEnd(3)}| Nome:${(cadastroCliente[a].nome).padEnd(30)}| Data cadastro:${formatDate(cadastroCliente[a].data, 'dd/mm/yyyy').padEnd(15)}| Tipo Sanguineo:${(tipoSanguineo[cadastroCliente[a].tipoSanguineo - 1] + antigenoD[cadastroCliente[a].positividade - 1]).padEnd(20)}|`)
            }
            console.log('-------------------------------------------------------------------------------------------------------------------')
        } else {
            console.log('-------------------------------------------------------------------------------------------------------------------')
            console.log(`Nao ha pessoas cadastradas com o sangue especificado`)
            console.log('-------------------------------------------------------------------------------------------------------------------')
        }
    } else {
        console.log(`Nao ha pessoas cadastradas`)
    }
}
function pesquisarData() {
    if (cadastroCliente.length > 0) {
        arrayData = []
        let  dataRead= new Date(dataHue(readline.question(`Qual a data a ser buscada? :`)))
        if (dataRead == 'Invalid Date') {
            dataRead = new Date
            console.log('Data Invalida\nUltilizando o dia Atual como referencia')
        }
        let numeroTransformado = formatDate(dataRead,"yyyymmdd")
        numeroTransformado
                    console.log(numeroTransformado)

        if(numeroTransformado<5000){
            console.log('hue')
        }

        for (let a = 0; a < cadastroCliente.length; a++) {
            if (Number(formatDate(cadastroCliente[a].data, "yyyymmdd")) <= numeroTransformado) {
                arrayData.push(cadastroCliente[a])
            }
        }
        if (arrayData.length > 0) {

            console.log('-------------------------------------------------------------------------------------------------------------------')
            for (let a = 0; a < arrayData.length; a++) {
                console.log(`| ID: ${(arrayData[a].id).toString().padEnd(3)}| Nome:${(arrayData[a].nome).padEnd(30)}| Data cadastro:${formatDate(arrayData[a].data, 'dd/mm/yyyy').padEnd(15)}| Tipo Sanguineo:${(tipoSanguineo[arrayData[a].tipoSanguineo - 1] + antigenoD[arrayData[a].positividade - 1]).padEnd(20)}|`)
            }
            console.log('-------------------------------------------------------------------------------------------------------------------')
        }
    }
    else {
        console.log(`Nao ha pessoas cadastradas`)
    }
}





function menuHemocentro() {
    while (true) {
        opcao = readline.questionInt('\===== SISTEMA DE CADASTRO DE DOADORES DE SANGUE =====\n1. Cadastrar doador\n2. Listar doadores\n3. Buscar doador por tipo sanguineo\n4. Buscar doador por data da ultima doacao\n5. Sair\n\nDigite o Numero: ')
        console.clear()

        switch (opcao) {
            case 1:
                cadastro()
                console.clear()
                readline.question('Pressione Enter para continuar')
                console.clear
                break;

            case 2:
                verPaciente()
                readline.question('Pressione Enter para continuar')
                console.clear()
                break;

            case 3:
                pacienteTipoSangue()
                readline.question('Pressione Enter para continuar')
                console.clear()
                break;

            case 4:
                pesquisarData()
                readline.question('Pressione Enter para continuar')
                console.clear()
                break;

            case 5:
                console.clear()
                return;

            default:

                break;

            case 27092002:
                console.log('Essa opcao e um easter egg')
                break;
        }
    }
}
console.clear()

menuHemocentro()
