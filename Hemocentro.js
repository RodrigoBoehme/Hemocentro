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

    }





datas=[]


i=0
cadastroCliente=[]
tipoSanguineo=['A','B','AB','O']//nome dos tipos
antigenoD=['+','-']//se é positivo ou negativo


function cadastro(){
    paciente={}
    paciente.id=i+1

    
    paciente.nome=readline.question(`Qual o Nome do paciente:`)
    paciente.tipoSanguineo=readline.questionInt((`Qual o Tipo Sanguineo do paciente?\n\n1. A\n2. B\n3. AB\n4. O\n\nDigite o numero correspondente: `))

    paciente.positividade=readline.questionInt('Seu sangue é positivo?\n1. Sim\n2. Nao\n\nDigite o Numero correspondente: ')
    

    
    const dataISO= new Date(readline.question(`Informe a data no padrao mm/dd/yyyy: `))
    formatDate(dataISO,'dd/mm/yyyy')
    paciente.data=dataISO
    cadastroCliente.push(paciente)
    console.log(cadastroCliente[i])
    
    i++
}

function verPaciente(){
    for(let a=0;a<cadastroCliente.length;a++){
        
        console.log(`ID: ${cadastroCliente[a].id}, Nome:${cadastroCliente[a].nome}, Data cadastro:${formatDate(cadastroCliente[a].data,'dd/mm/yyyy')}, Tipo Sanguineo:${tipoSanguineo[cadastroCliente[a].tipoSanguineo-1]}${antigenoD[cadastroCliente[a].positividade-1]}`)
    }
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

        console.log('Positivo ou Negativo?\n1. Positivo\n2. Negativo')
        
        opcaoAntingeno=readline.questionInt('Escolha um numero: ')

        for(let i=0;i<cadastroCliente.length;i++){
        if(cadastroCliente[i].positividade==opcaoAntingeno-1){
            arrayAntigeno.push(cadastroCliente[i])
            
        }
} 
     for(let i=0;i<arrayAntigeno.length;i++){
        if(arrayAntigeno[i].tipoSanguineo==opcaoTipo-1){
            arrayTipo.push(arrayAntigeno[i])
        }
}
    if(arrayAntigeno.length>0){
    console.log(`Pessoas com o sangue especificado:`)
        for(let i=0;i<arrayTipo.length;i++){
            console.log(`${i+1}. ${arrayTipo[i].nome}`)
        }

}
}





function menuHemocentro(){
    while(true){
        opcao=readline.questionInt('\===== SISTEMA DE CADASTRO DE DOADORES DE SANGUE =====\n1. Cadastrar doador\n2. Listar doadores\n3. Buscar doador por tipo sanguineo\n4. Buscar doador por data da ultima doacao\n5. Sair\n\nDigite o Numero: ')

        switch(opcao){
            case 1:
                cadastro()                    
            break;

            case 2:
                verPaciente()
            break;

            case 3:
                console.log('Essa funcao esta em producao no momento')
                pacienteTipoSangue()
            break;

            case 4:
                console.log('Essa funcao ainda nao esta pronta')
            break;

            case 5:

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
