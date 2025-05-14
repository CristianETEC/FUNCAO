const itensOriginais = [
    { id: 1, nome: "Apenas um Show" },
    { id: 2, nome: "Hora de Aventura" },
    { id: 3, nome: "Steven Universo" },
    { id: 4, nome: "Sendokai" },
    { id: 5, nome: "Ben 10" }
];

const listaItens = document.getElementById("listaItens");
const listaSelecionados = document.getElementById("listaSelecionados");
const adicionarButton = document.getElementById("adicionarButton");
const removerButton = document.getElementById("removerButton");
const resetButton = document.getElementById("resetButton");

let itens = [...itensOriginais]; 
let itensSelecionados = [];
let itemSelecionado = null;

function renderizarLista() {
    listaItens.innerHTML = '';
    itens.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item.nome;
        li.setAttribute('data-id', item.id);
        li.onclick = function() {
            selecionarItem(li, item.id);
        };
        listaItens.appendChild(li);
    });
}

function renderizarListaSelecionados() {
    listaSelecionados.innerHTML = '';
    itensSelecionados.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item.nome;
        li.setAttribute('data-id', item.id);
        li.onclick = function() {
            selecionarItemSelecionado(li, item.id);
        };
        listaSelecionados.appendChild(li);
    });
}

function selecionarItem(li, id) {
    if (itemSelecionado === id) {
        li.classList.remove('selected');
        itemSelecionado = null;
        adicionarButton.disabled = true;
        return;
    }

    const listaItems = document.querySelectorAll("#listaItens li");
    listaItems.forEach(item => item.classList.remove('selected'));

    li.classList.add('selected');
    itemSelecionado = id;
    adicionarButton.disabled = false;
}

function selecionarItemSelecionado(li, id) {
    if (itemSelecionado === id) {
        li.classList.remove('selected');
        itemSelecionado = null;
        removerButton.disabled = true;
        return;
    }

    const listaItems = document.querySelectorAll("#listaSelecionados li");
    listaItems.forEach(item => item.classList.remove('selected'));

    li.classList.add('selected');
    itemSelecionado = id;
    removerButton.disabled = false;
}

adicionarButton.onclick = function() {
    if (itemSelecionado === null) return;

    const itemIndex = itens.findIndex(item => item.id === itemSelecionado);
    const item = itens.splice(itemIndex, 1)[0];

    itensSelecionados.push(item);
    itemSelecionado = null;
    adicionarButton.disabled = true;

    renderizarLista();
    renderizarListaSelecionados();
};

removerButton.onclick = function() {
    if (itemSelecionado === null) return;

    const itemIndex = itensSelecionados.findIndex(item => item.id === itemSelecionado);
    const item = itensSelecionados.splice(itemIndex, 1)[0];

    itens.push(item);
    itemSelecionado = null;
    removerButton.disabled = true;

    renderizarLista();
    renderizarListaSelecionados();
};

resetButton.onclick = function() {
    itens = [...itensOriginais]; 
    itensSelecionados = [];
    renderizarLista();
    renderizarListaSelecionados();
};

renderizarLista();
