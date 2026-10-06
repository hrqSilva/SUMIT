document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       2. IDENTIFICAR PÁGINA ATUAL
    ===================================================== */

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    document.querySelectorAll(
        ".menu a"
    ).forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) return;


        const paginaLink =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            paginaLink === paginaAtual
        ) {

            link.classList.add(
                "pagina-atual"
            );

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });


    /* =====================================================
       3. BOTÃO VOLTAR AO TOPO
    ===================================================== */

    const botaoTopo =
        document.createElement("button");

    botaoTopo.id = "botao-topo";

    botaoTopo.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    botaoTopo.innerHTML = "↑";

    document.body.appendChild(
        botaoTopo
    );


    function verificarTopo() {

        if (window.scrollY > 450) {

            botaoTopo.classList.add(
                "visivel"
            );

        } else {

            botaoTopo.classList.remove(
                "visivel"
            );

        }

    }


    window.addEventListener(
        "scroll",
        verificarTopo,
        {
            passive: true
        }
    );


    botaoTopo.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    verificarTopo();


    /* =====================================================
       4. APARECIMENTO DAS SEÇÕES
    ===================================================== */

    const secoes =
        document.querySelectorAll(
            "main section:not(.hero):not(.pagina-titulo)"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observador =
            new IntersectionObserver(
                function (entradas, observer) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "secao-visivel"
                                );

                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        secoes.forEach(
            function (secao) {

                secao.classList.add(
                    "secao-animada"
                );

                observador.observe(
                    secao
                );

            }
        );

    }


    /* =====================================================
       5. SIMULADOR DE ATENDIMENTO
    ===================================================== */

    const fluxo =
        document.querySelector(
            "#fluxo"
        );


    if (fluxo) {

        const simulador =
            document.createElement(
                "div"
            );


        simulador.id =
            "simulador-nexora";


        simulador.innerHTML = `

            <div class="simulador-cabecalho">

                <span class="simulador-tag">
                    SIMULAÇÃO
                </span>

                <h2>
                    Simulador de atendimento
                </h2>

                <p>
                    Acompanhe as sete etapas
                    do atendimento proposto
                    pela NEXORA.
                </p>

            </div>


            <div class="simulador-conteudo">


                <div class="simulador-status">

                    <div class="status-topo">

                        <span>
                            PROGRESSO
                        </span>

                        <strong id="contador-etapa">
                            0 / 7
                        </strong>

                    </div>


                    <div
                        class="barra-progresso"
                    >

                        <div
                            id="barra-simulador"
                        ></div>

                    </div>


                    <div
                        class="etapa-atual"
                    >

                        <span
                            class="icone-status"
                            id="icone-status"
                        >
                            1
                        </span>


                        <div>

                            <span
                                class="label-status"
                            >
                                STATUS DO ATENDIMENTO
                            </span>

                            <h3
                                id="titulo-simulador"
                            >
                                Pronto para iniciar
                            </h3>

                            <p
                                id="status-simulador"
                            >
                                Clique em
                                "Simular próximo passo"
                                para iniciar.
                            </p>

                        </div>

                    </div>

                </div>


                <div
                    class="lista-etapas"
                    id="etapas-simulador"
                >

                    <div data-etapa="0">

                        <span>01</span>

                        <strong>
                            Consulta criada
                        </strong>

                    </div>


                    <div data-etapa="1">

                        <span>02</span>

                        <strong>
                            Paciente recebe confirmação
                        </strong>

                    </div>


                    <div data-etapa="2">

                        <span>03</span>

                        <strong>
                            Paciente confirma
                        </strong>

                    </div>


                    <div data-etapa="3">

                        <span>04</span>

                        <strong>
                            Recepção confirma presença
                        </strong>

                    </div>


                    <div data-etapa="4">

                        <span>05</span>

                        <strong>
                            Paciente entra em espera
                        </strong>

                    </div>


                    <div data-etapa="5">

                        <span>06</span>

                        <strong>
                            Médico inicia
                        </strong>

                    </div>


                    <div data-etapa="6">

                        <span>07</span>

                        <strong>
                            Atendimento concluído
                        </strong>

                    </div>

                </div>

            </div>


            <div class="botoes-simulador">

                <button
                    id="proximo-passo"
                    type="button"
                    class="botao-principal-simulador"
                >
                    Simular próximo passo
                </button>


                <button
                    id="reiniciar-simulacao"
                    type="button"
                    class="botao-secundario-simulador"
                >
                    Reiniciar simulação
                </button>

            </div>

        `;


        /*
         * O simulador entra depois da seção
         * "Fluxo principal".
         */

        fluxo.insertAdjacentElement(
            "afterend",
            simulador
        );


        /* =================================================
           DADOS DAS 7 ETAPAS
        ================================================= */

        const etapas = [

            {
                titulo:
                    "Consulta criada",

                mensagem:
                    "O atendimento é criado no sistema da NEXORA."
            },

            {
                titulo:
                    "Paciente recebe confirmação",

                mensagem:
                    "O paciente recebe uma confirmação relacionada ao atendimento."
            },

            {
                titulo:
                    "Paciente confirma",

                mensagem:
                    "O paciente confirma sua presença."
            },

            {
                titulo:
                    "Recepção confirma presença",

                mensagem:
                    "A recepção realiza a confirmação presencial."
            },

            {
                titulo:
                    "Paciente entra em espera",

                mensagem:
                    "Após a confirmação, o paciente entra no fluxo de espera."
            },

            {
                titulo:
                    "Médico inicia",

                mensagem:
                    "O profissional de saúde inicia o atendimento."
            },

            {
                titulo:
                    "Atendimento concluído",

                mensagem:
                    "O atendimento é finalizado com sucesso."
            }

        ];


        let etapaAtual = -1;


        const botaoProximo =
            document.querySelector(
                "#proximo-passo"
            );


        const botaoReiniciar =
            document.querySelector(
                "#reiniciar-simulacao"
            );


        const contador =
            document.querySelector(
                "#contador-etapa"
            );


        const titulo =
            document.querySelector(
                "#titulo-simulador"
            );


        const status =
            document.querySelector(
                "#status-simulador"
            );


        const barra =
            document.querySelector(
                "#barra-simulador"
            );


        const icone =
            document.querySelector(
                "#icone-status"
            );


        const elementosEtapas =
            document.querySelectorAll(
                "#etapas-simulador [data-etapa]"
            );


        /* =================================================
           ATUALIZAR SIMULAÇÃO
        ================================================= */

        function atualizarSimulador() {

            if (etapaAtual === -1) {

                contador.textContent =
                    "0 / 7";


                titulo.textContent =
                    "Pronto para iniciar";


                status.textContent =
                    'Clique em "Simular próximo passo" para iniciar.';


                barra.style.width =
                    "0%";


                icone.textContent =
                    "1";


                elementosEtapas.forEach(
                    function (item) {

                        item.classList.remove(
                            "etapa-atual"
                        );

                        item.classList.remove(
                            "etapa-concluida"
                        );

                    }
                );


                botaoProximo.disabled =
                    false;


                botaoProximo.textContent =
                    "Simular próximo passo";


                return;

            }


            const etapa =
                etapas[etapaAtual];


            contador.textContent =
                (etapaAtual + 1) +
                " / 7";


            titulo.textContent =
                etapa.titulo;


            status.textContent =
                etapa.mensagem;


            barra.style.width =
                (
                    ((etapaAtual + 1) / 7) * 100
                ) +
                "%";


            icone.textContent =
                etapaAtual + 1;


            elementosEtapas.forEach(
                function (item, indice) {

                    item.classList.remove(
                        "etapa-atual"
                    );

                    item.classList.remove(
                        "etapa-concluida"
                    );


                    if (
                        indice < etapaAtual
                    ) {

                        item.classList.add(
                            "etapa-concluida"
                        );

                    }


                    if (
                        indice === etapaAtual
                    ) {

                        item.classList.add(
                            "etapa-atual"
                        );

                    }

                }
            );


            if (
                etapaAtual === 6
            ) {

                botaoProximo.disabled =
                    true;

                botaoProximo.textContent =
                    "Simulação concluída";

            } else {

                botaoProximo.disabled =
                    false;

                botaoProximo.textContent =
                    "Simular próximo passo";

            }

        }


        /* =================================================
           PRÓXIMO PASSO
        ================================================= */

        botaoProximo.addEventListener(
            "click",
            function () {

                if (
                    etapaAtual < 6
                ) {

                    etapaAtual++;

                    atualizarSimulador();

                }

            }
        );


        /* =================================================
           REINICIAR
        ================================================= */

        botaoReiniciar.addEventListener(
            "click",
            function () {

                etapaAtual = -1;

                atualizarSimulador();

            }
        );


        atualizarSimulador();

    }

});