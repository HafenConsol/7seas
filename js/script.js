/* --- ROBÔ DE INTELIGÊNCIA DE MERCADO (Ticker) --- */

async function fetchMarketData() {
    try {
        // Busca cotação de Dólar, Euro e Bitcoin na API
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-USD');
        const data = await response.json();

        /* --- Atualiza os elementos no HTML --- */
        
        // Dólar (USD)
        const usd = parseFloat(data.USDBRL.bid).toFixed(2);
        // Atualiza no bloco original e no clone (loop)
        updatePrice('usd-price', `R$ ${usd}`);

        // Euro (EUR)
        const eur = parseFloat(data.EURBRL.bid).toFixed(2);
        updatePrice('eur-price', `R$ ${eur}`);

        // Bitcoin (BTC)
        const btc = parseFloat(data.BTCUSD.bid).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        updatePrice('btc-price', btc);

    } catch (error) {
        console.error("Erro ao buscar cotações:", error);
    }
}

// Função auxiliar para atualizar o ID original e o ID do clone (-2)
function updatePrice(id, value) {
    const el1 = document.getElementById(id);
    const el2 = document.getElementById(id + '-2'); // O clone tem o sufixo -2
    
    if (el1) el1.innerText = value;
    if (el2) el2.innerText = value;
}

// Inicia assim que carrega
fetchMarketData();

// Atualiza a cada 30 segundos
setInterval(fetchMarketData, 30000);

/* --- CONTROLE DAS ABAS DO TERMINAL --- */

function openTab(evt, tabName) {
    // Esconde todo o conteúdo das abas
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Tira a classe 'active' de todos os botões
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostra a aba atual e adiciona 'active' no botão clicado
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 1. Simulação de Rastreio (Versão Inteligente)
function simulateTracking() {
    const input = document.getElementById('trackInput').value.toUpperCase().trim(); // Converte pra maiúscula e tira espaços
    const resultBox = document.getElementById('trackResult');
    const btn = document.querySelector('#track .terminal-action-btn');

    // Validação Básica
    if (input === "") {
        alert("Please enter a valid container or BL number.");
        return;
    }

    // Efeito Visual de Carregando
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> SEARCHING...';
    btn.style.opacity = "0.7";
    resultBox.style.display = "none"; // Esconde resultado anterior

    // Simula o tempo de busca no servidor (2 segundos)
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = "1";

        // A MÁGICA: Só aceita códigos que começam com "HFN" (Hafen) ou "7S" (7 Seas)
        // Ou um código específico de demonstração: "DEMO-01"
        if (input.startsWith("HFN") || input.startsWith("7S") || input === "DEMO-01") {
            
            // SUCESSO (Carga Encontrada)
            resultBox.innerHTML = `
                <p style="color: #00ff9d; font-size: 0.8rem; margin-bottom: 5px;"><i class="fas fa-check-circle"></i> CARGO FOUND</p>
                <p style="color: #fff; font-size: 0.9rem;">ID: <b style="color: #fff;">${input}</b></p>
                <p style="color: #fff; font-size: 0.9rem;">LOCATION: <b style="color: var(--gold-primary);">NORTH ATLANTIC (EN ROUTE)</b></p>
                <p style="color: #888; font-size: 0.7rem;">ETA: ROTTERDAM (3 DAYS)</p>
            `;
            resultBox.style.display = "block";
            resultBox.style.animation = "fadeIn 0.5s";

        } else {
            
            // ERRO (Não encontrado - Dá mais realismo!)
            resultBox.innerHTML = `
                <p style="color: #ff3b30; font-size: 0.8rem; margin-bottom: 5px;"><i class="fas fa-times-circle"></i> NOT FOUND</p>
                <p style="color: #888; font-size: 0.8rem;">No active shipment found for <b>${input}</b>.</p>
                <p style="color: #666; font-size: 0.7rem;">Please check with your broker.</p>
            `;
            resultBox.style.display = "block";
            resultBox.style.animation = "fadeIn 0.5s";
        }

    }, 2000);
}

/* --- CONTROLE DO MODAL DE CONTATO --- */

function openModal() {
    document.getElementById('inquiryModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('inquiryModal').style.display = 'none';
}

// Fechar se clicar fora da janelinha
window.onclick = function(event) {
    const modal = document.getElementById('inquiryModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Simulação de Envio (Com Limpeza de Formulário)
function submitInquiry() {
    const btn = document.querySelector('.inquiry-form .terminal-action-btn');
    const form = document.querySelector('.inquiry-form'); // Seleciona o formulário
    const originalText = '<i class="fas fa-paper-plane"></i> TRANSMIT REQUEST'; // Texto original do botão
    
    // 1. Muda para "Enviando..."
    btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> TRANSMITTING...';
    btn.style.opacity = '0.7';
    
    // 2. Espera 2 segundos (Simulação de Rede)
    setTimeout(() => {
        
        // 3. Sucesso!
        btn.innerHTML = '<i class="fas fa-check"></i> REQUEST SENT';
        btn.style.background = '#00ff9d';
        btn.style.color = '#000';
        btn.style.opacity = '1';
        
        // 4. Espera mais 1.5s para o usuário ler, depois fecha e limpa
        setTimeout(() => {
            closeModal();
            
            // A MÁGICA ACONTECE AQUI:
            form.reset(); // Apaga tudo que foi digitado nos campos
            
            // Reseta o botão para o estado original
            btn.innerHTML = originalText;
            btn.style.background = 'var(--gold-primary)'; 
            btn.style.color = '#000';
        }, 1500);

    }, 2000);
}