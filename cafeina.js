const validation = { //Obejto responsável pela as funções de validação do input
    buttonSubit: (event)=>{ //Evento inicial ao clicar a button
        event.preventDefault(); //Caso o campo de texto (Input) seja inválido
        let send = true; 

        let inputs = form.querySelectorAll("input"); //Busca todos os inputs

        validation.cleanError(); //função para correção dos erros

        for(let i=0; i<inputs.length; i++){ //For para percorrer o inputs e analisar sua validação
            let input = inputs[i];
            let check = validation.checkInput(input); //Envia um input por vez

            if(check !== true){
                send = false;
                validation.erroShow(input, check);
            }
        }

        if(send){
            form.submit();
        }
    },

    //Função para chekar se há algum erro no input enviado
    checkInput: (input)=>{
        let rules = input.getAttribute("data-rules"); //Pega os atributos presentes dentro do atributo date-

        if(rules !== null){
            rules = rules.split("|") //Pega os campos abrigatórios e os armazenam em um vetor
            for(let k in rules){
                let valorRules = rules[k].split("="); //Transformar campos com numero em vetor
                switch(valorRules[0]){
                    case "requerid": //Campo obrigatório
                        if(input.value == ""){
                            return "Campo é obrigatório";
                        }
                    break;
                    case "min": //Campo para o mínino de caracteres
                        if(input.value.length < valorRules[1]){
                            return "Campo deve ter mais de "+valorRules[1]+" caracteres";
                        }
                    break;
                }
            }
        }
        return true;
    },

    //Função para validar erros
    erroShow: (input, erro) =>{
        input.style.borderColor = "red";

        let errorElement = document.createElement("div");
        errorElement.classList.add("erro");
        errorElement.textContent = erro;

        input.parentElement.insertBefore(errorElement, input); //Irá imprimir os erros na tela do usúario
    },

    //Função para evitar a repetição das mensagens de erros
    cleanError: ()=>{
        let inputs = form.querySelectorAll("input");
        for(let i=0; i<inputs.length; i++){
            inputs[i].style = "";
        }

        let errorElement = document.querySelectorAll(".erro");
        for(let i=0; i<errorElement.length; i++){
            errorElement[i].remove();
        }
    },
}

//Constate de form
const form = document.querySelector("#form");

//Adicionando o evento listener à constante
form.addEventListener("submit", validation.buttonSubit);
