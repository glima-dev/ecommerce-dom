// FUNÇÕES

// FUNÇÃO GENÉRICA PARA ACESSAR E LISTAR TODOS OS PRODUTOS
function listPlotter(list, htmlReference) {
    htmlReference.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        let itemCard = list[i];
        if (list[0].addCart != "Remover") {
            let template = createTemplateVitrine(itemCard);
            htmlReference.appendChild(template);
        } else {
            let template = createTemplateCarrinho(itemCard);
            htmlReference.appendChild(template);
        }
    }
    return (htmlReference);
}

// FUNÇÃO RESPONSÁVEL PELA CRIAÇÃO DO TEMPLATE A SER RENDERIZADO NA VITRINE
function createTemplateVitrine(itemCardInfo) {

    // RECUPERANDO INFORMAÇÕES SOBRE O PRODUTO
    let idProduto = itemCardInfo.id;
    let image = itemCardInfo.img;
    let name = itemCardInfo.nameItem;
    let description = itemCardInfo.description;
    let price = itemCardInfo.value;
    let addButton = itemCardInfo.addCart;
    let categoria = itemCardInfo.tag;

    // CRIANDO AS TAGS PARA O TEMPLATE
    let tagLi = document.createElement("li");
    let tagFigure = document.createElement("figure");
    let tagImg = document.createElement("img");
    let tagDivCategoria = document.createElement("div");
    let tagPCategoria = document.createElement("p");
    let tagH2 = document.createElement("h2");
    let tagPDescricao = document.createElement("p");
    let tagPValor = document.createElement("p");
    let tagButton = document.createElement("button");

    // INSERINDO CLASSES ÀS TAGS QUE PRECISAM
    tagLi.classList.add("cardProduto");
    tagDivCategoria.classList.add("cardTag");
    tagButton.classList.add("productButton");

    // ADICIONANDO INFORMAÇÕES ÀS TAGS
    tagImg.src = image;
    tagImg.alt = `${categoria[0]} - ${name}`;
    tagImg.title = name;
    tagPCategoria.innerText = categoria[0];
    tagH2.innerText = name;
    tagPDescricao.innerText = description;
    tagPValor.innerText = `R$ ${price},00`;
    tagButton.innerText = addButton;
    tagButton.id = `item_${idProduto}`;

    // MONTANDO O TEMPLATE CONFORME ÁVORE
    tagFigure.appendChild(tagImg);
    tagDivCategoria.appendChild(tagPCategoria);
    tagLi.append(tagFigure, tagDivCategoria, tagH2, tagPDescricao, tagPValor, tagButton);

    return tagLi;
}

// FUNÇÃO RESPONSÁVEL PELA CRIAÇÃO DO TEMPLATE A SER RENDERIZADO NO CARRINHO
function createTemplateCarrinho(itemCardInfo) {

    // RECUPERANDO INFORMAÇÕES SOBRE O PRODUTO
    let idProduto = itemCardInfo.id;
    let image = itemCardInfo.img;
    let name = itemCardInfo.nameItem;
    let price = itemCardInfo.value;
    let removeButton = itemCardInfo.addCart;

    // CRIANDO AS TAGS PARA O TEMPLATE
    let tagLi = document.createElement("li");
    let tagImg = document.createElement("img");
    let tagDivResumo = document.createElement("div");
    let tagH4 = document.createElement("h4");
    let tagPValor = document.createElement("p");
    let tagButton = document.createElement("button");

    // INSERINDO CLASSES ÀS TAGS QUE PRECISAM
    tagLi.classList.add("produtoCart");

    // PARA O BOTÃO REMOVER FOI ADICIONADO UMA CLASSE ID JÁ QUE PODEM EXISTIR MAIS DE UM PRODUTO IGUAL NO CARRINHO
    tagButton.classList.add(`del_${idProduto}`);
    tagButton.classList.add(`removebt`);

    // INSERIR O EVENTO DE CLICK NO BOTÃO REMOVER
    tagButton.addEventListener("click", function (event) {
        let idElemento = event.target.classList[0];
        let id = parseInt(idElemento.substring(4));        
        removeProdutoCarrinho(id);
    });

    // ADICIONANDO INFORMAÇÕES ÀS TAGS DO CARD
    tagImg.src = image;
    tagImg.alt = name;
    tagImg.title = name;
    tagH4.innerText = name;
    tagPValor.innerText = `R$ ${price},00`;
    tagButton.innerText = removeButton;

    // MONTANDO O TEMPLATE CONFORME ÁVORE
    tagDivResumo.append(tagH4, tagPValor, tagButton);
    tagLi.append(tagImg, tagDivResumo);

    return tagLi;
}

// FUNÇÃO RESPONSÁVEL POR REMOVER ITENS DA LISTA CARRINHO
function removeProdutoCarrinho(id) {
    let listaIdsCarrinho = [];
    let indexToDel = 0;

    // GERA UMA LISTA APENAS COM ID'S DOS PRODUTOS NO CARRINHO
    for (let i = 0; i < listaCarrinho.length; i++) {
        listaIdsCarrinho.push(listaCarrinho[i].id);
    }

    // IDENTIFICA E REMOVE ITEM DA LISTA CARRINHO
    indexToDel = listaIdsCarrinho.indexOf(id);
    listaCarrinho.splice(indexToDel, 1);

    totalProdutos--;
    valorTotalCarrinho = 0;
    for (let i = 0; i < listaCarrinho.length; i++) {
        valorTotalCarrinho += listaCarrinho[i].value;
    }
    
    // VERIFICA CARRINHO VAZIO
    if (listaCarrinho.length <= 0) {
        divCarrinho.innerHTML = "";
        divCarrinho.innerHTML = carrinhoVazio;
        divResumo.innerHTML = "";
    } else {
        atualizaCarrinho(listaCarrinho);
    }
}

// FUNÇÃO IRÁ PROCURAR UM PRODUTO NA BASE PARA ALIMENTAR A LISTA CARRINHO
function procuraProduto(id) {
    for (let i = 0; i < data.length; i++) {
        let produto = data[i];
        if (produto.id == id) {
            return produto;
        }
    }
}

// FUNÇÃO RESPONSÁVEL POR ADICIONAR ITENS AO CARRINHO
function addCarrinho(produto) {
    listaCarrinho.push(produto);
    totalProdutos++;
    valorTotalCarrinho = 0;
    for (let i = 0; i < listaCarrinho.length; i++) {
        valorTotalCarrinho += listaCarrinho[i].value;
    }

    atualizaCarrinho(listaCarrinho);
}

// FUNÇÃO RESPONSÁVEL POR LIMPAR O CARRINHO RENDERIZADO E REINSERIR A LISTA CARRINHO ATUALIZADA
function atualizaCarrinho(lista) {
    divCarrinho.innerHTML = "";
    let tagUlCarrinho = document.createElement("ul");
    tagUlCarrinho.classList.add("lista-carrinho")
    divCarrinho.append(listPlotter(lista, tagUlCarrinho));
    divResumo.innerHTML = "";
    divResumo.insertAdjacentHTML("beforeend",
        `<section class="detalhesCart">
            <div>
                <p>Quantidade</p>
                <p>${totalProdutos}</p>
            </div>
            <div>
                <p>Total</p>
                <p>R$ ${valorTotalCarrinho},00</p>
            </div>
        </section>`);
}

// VARIÁVEIS E INSTRUÇÕES INICIAIS

// TAG REFERÊNCIA PARA RENDERIZAR A LISTA VITRINE
let ulVitrine = document.getElementsByClassName("containerProdutos")[0];
listPlotter(data, ulVitrine);

// TAG REFERÊNCIA PARA RENDERIZAR A LISTA DO CARRINHO
let divCarrinho = document.getElementsByClassName("listaProdutos")[0];

// RENDERIZAÇÃO INICIAL DO CARRINHO VAZIO
let carrinhoVazio = "<p>Carrinho vázio</p><p>Adicione itens</p>";
divCarrinho.innerHTML = carrinhoVazio;

// TAG REFERÊNCIA PARA RENDERIZAR O RESUMO DA COMPRA
let divResumo = document.getElementsByClassName("divResumo")[0];

let listaCarrinho = [];
let totalProdutos = 0;
let valorTotalCarrinho = 0;
let botoesProduto = document.getElementsByClassName('productButton');

// ITERA BOTÕES DA VITRINE PARA ATRIBUIR O EVENTO ADICIONAR PRODUTO
for (let i = 0; i < botoesProduto.length; i++) {
    let botao = botoesProduto[i];
    botao.addEventListener('click', function (event) {

        // RESGATAR O ID DE CADA BOTÃO E RETIRAR O PREFIXO STRING
        let idElemento = event.target.id;
        let id = parseInt(idElemento.substring(5));
        let produto = procuraProduto(id);

        // ALTERAR A PROPRIEDADE ADDCART PARA "REMOVER"
        produto.addCart = "Remover";

        addCarrinho(produto);
    })
};

