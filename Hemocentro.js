const readline=require('readline-sync')

function formatDate(dDate,sMode){       
        var today = dDate;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        if (sMode+""==""){
            sMode = "dd/mm/yyyy";
        }
        if (sMode == "yyyy-mm-dd"){
            return  yyyy + "-" + mm + "-" + dd + "";
        }
        if (sMode == "dd/mm/yyyy"){
            return  dd + "/" + mm + "/" + yyyy;
        }
        if (sMode == "yyyymmdd"){
            return yyyy + mm + dd
        }

}

function dataHue(input){
    let today=input.split('/'||"-"||'|')
    let dd=today[0]
    let mm=today[1]
    let yyyy=today[2]
    return mm + '/' + dd + '/' + yyyy
}



datas=[]


i=0
cadastroCliente=[]
tipoSanguineo=['A','B','AB','O']//nome dos tipos
antigenoD=['+','-']//se é positivo ou negativo


function cadastro(){
    paciente={}
    paciente.id=i+1

    console.clear
    paciente.nome=readline.question(`Qual o Nome do paciente:`)
    paciente.tipoSanguineo=readline.questionInt((`Qual o Tipo Sanguineo do paciente?\n\n1. A\n2. B\n3. AB\n4. O\n\nDigite o numero correspondente: `))
    paciente.positividade=readline.questionInt('Seu sangue é positivo?\n1. Sim\n2. Nao\n\nDigite o Numero correspondente: ')
    

    
    const dataISO= new Date(dataHue(readline.question(`Informe a data: `)))
   // formatDate(dataISO,'dd/mm/yyyy')
    paciente.data=dataISO
    cadastroCliente.push(paciente)
    console.log(cadastroCliente[i])
    
    i++
}

function verPaciente(){
    console.log('-------------------------------------------------------------------------------------------------------------------')
    for(let a=0;a<cadastroCliente.length;a++){
        
        console.log(`| ID: ${(cadastroCliente[a].id).toString().padEnd(3)}| Nome:${(cadastroCliente[a].nome).padEnd(30)}| Data cadastro:${formatDate(cadastroCliente[a].data,'dd/mm/yyyy').padEnd(15)}| Tipo Sanguineo:${(tipoSanguineo[cadastroCliente[a].tipoSanguineo-1]+antigenoD[cadastroCliente[a].positividade-1]).padEnd(20)}|`)
    }
    console.log('-------------------------------------------------------------------------------------------------------------------')
}
function pacienteTipoSangue(){
    arrayTipo=[]
    arrayAntigeno=[]
    let opcaoTipo;
    let opcaoAntingeno;

    console.log(`Escolha um tipo de Sangue:`)
            for(let i=0;i<tipoSanguineo.length;i++){
            console.log(`${i+1}. ${tipoSanguineo[i]}`)
            }
        opcaoTipo=readline.questionInt(`Escolha um Numero: `)

        opcaoAntingeno=readline.questionInt('Positivo ou Negativo?\n1. Positivo\n2. Negativo\nEscolha um numero: ')
        

        for(let i=0;i<cadastroCliente.length;i++){
        if(cadastroCliente[i].positividade==opcaoAntingeno){
            arrayAntigeno.push(cadastroCliente[i])
            20231231
        }
} 
     for(let i=0;i<arrayAntigeno.length;i++){
        if(arrayAntigeno[i].tipoSanguineo==opcaoTipo){
            arrayTipo.push(arrayAntigeno[i])
        }
}
    if(arrayTipo.length>0){
    console.log(`Pessoas com o sangue ${tipoSanguineo[opcaoTipo-1]}${antigenoD[opcaoAntingeno]}`)
        for(let i=0;i<arrayTipo.length;i++){
            console.log(`${i+1}. ${arrayTipo[i].nome} Data cadastro:${formatDate(cadastroCliente[i].data,'dd/mm/yyyy')}, Tipo Sanguineo:${tipoSanguineo[cadastroCliente[i].tipoSanguineo-1]}${antigenoD[cadastroCliente[i].positividade-1]}`)
        }

}
}
function pesquisarData(){
    let nSeiAinda=new Date(dataHue(readline.question(`Qual a data a ser buscada? :`)))
    let numeroTransformado= Number(formatDate(nSeiAinda,"yyyymmdd"))
    console.log(numeroTransformado)
    console.log('-------------------------------------------------------------------------------------------------------------------')
    for(let a=0;a<cadastroCliente.length;a++){
        if(Number(formatDate(cadastroCliente[a].data,"yyyymmdd"))<numeroTransformado){
            console.log(`| ID: ${(cadastroCliente[a].id).toString().padEnd(3)}| Nome:${(cadastroCliente[a].nome).padEnd(30)}| Data cadastro:${formatDate(cadastroCliente[a].data,'dd/mm/yyyy').padEnd(15)}| Tipo Sanguineo:${(tipoSanguineo[cadastroCliente[a].tipoSanguineo-1]+antigenoD[cadastroCliente[a].positividade-1]).padEnd(20)}|`)
        
        }
        console.log('-------------------------------------------------------------------------------------------------------------------')
    }

}





function menuHemocentro(){
    while(true){
        opcao=readline.questionInt('\===== SISTEMA DE CADASTRO DE DOADORES DE SANGUE =====\n1. Cadastrar doador\n2. Listar doadores\n3. Buscar doador por tipo sanguineo\n4. Buscar doador por data da ultima doacao\n5. Sair\n\nDigite o Numero: ')

        switch(opcao){
            case 1:
                cadastro()
                readline.question('Pressione Enter para continuar')
            break;

            case 2:
                verPaciente()
                readline.question('Pressione Enter para continuar')
            break;

            case 3:
                pacienteTipoSangue()
                readline.question('Pressione Enter para continuar')
            break;

            case 4:
                pesquisarData()                
                readline.question('Pressione Enter para continuar')
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

menuHemocentro()
