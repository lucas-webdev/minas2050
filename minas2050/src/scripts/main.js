$(function() {
    'use strict';

    Vue.component('MainMenu', {
        template: /*html*/ `
            <nav id="main_menu">
                <ul>
                    <li v-for="item in menuItemsList">
                        <a :href="item.menuAnchor">{{item.menuLabel}}</a>
                    </li>
                </ul>
            </nav>
        `,
        data: function() {
            return {
                menuItemsList: [
                    { menuLabel: 'Menu 1', menuAnchor: 'anchor1' },
                    { menuLabel: 'Menu 2', menuAnchor: 'anchor2' },
                    { menuLabel: 'Menu 3', menuAnchor: 'anchor3' }
                ]
            };
        }
    });

    Vue.component('DefaultButton', {
        template: `<a :href="buttonLink" class="default-button" :class="buttonClass" :target="buttonTarget">{{buttonLabel}}</a>`,
        props: {
            buttonType: {
                type: String,
                default: 'primary'
            },
            buttonLabel: {
                type: String,
                default: 'Saiba mais'
            },
            buttonLink: {
                type: String,
                default: '#'
            },
            buttonTarget: {
                type: String,
                default: '_self'
            }
        },
        computed: {
            buttonClass() {
                return `default-button--${this.buttonType}`;
            }
        }
    });

    Vue.component('Banner', {
        template: /*html*/ `
            <section id="banner">
                <img :src="logoImgSrc" />
                <h1 id="banner_title">{{bannerTitle}}</h1>
                <default-button buttonType="secondary" :buttonLabel="bannerCtaLabel" :buttonLink="bannerCtaAnchor"></default-button>
                <div class="detalhe"></div>
            </section>`,
        props: {
            bannerTitle: {
                type: String,
                default: 'Titulo do banner'
            },
            bannerCtaLabel: {
                type: String,
                default: 'Saiba mais'
            },
            bannerCtaAnchor: {
                type: String,
                default: '#events_calendar'
            },
            logoImgSrc: {
                type: String,
                default: ''
            }
        }
    });

    Vue.component('AboutUs', {
        template: /*html*/ `
            <section id="aboutUs">
                <h2 class="section-title" v-html="aboutUsTitle"></h2>
                <div class="about-items">
                    <article v-for="item in aboutItems">
                        <figure>
                            <img class="about-img" :src="item.imageSrc" />
                        </figure>
                        <div class="about-text">
                            <h4 class="about-title article-title">{{item.title}}</h4>
                            <span class="about-description article-text">{{item.description}}</span>    
                            <div class="article-cta">
                                <default-button buttonType="primary" :buttonLabel="item.btnText" :buttonLink="item.btnLink" buttonTarget='_blank'></default-button>
                            </div>
                        </div>
                        <div class="article-divisor"></div>
                    </article>
                </div>
            </section>
        `,
        props: {
            aboutUsTitle: {
                type: String,
                default: 'Sobre o <span class="blue-letters">2</span><span class="green-letters">0</span><span class="red-letters">50</span>'
            }
        },
        data() {
            return {
                aboutItems: [
                    {
                        title: 'DISTRIBUIÇÃO, uso da energia em 2050',
                        description: `Após discutir os temas Geração e Transmissão o Seminário de 13/11 abordará as inovações e 
                                tendências para a Distribuição de energia, especificamente nos segmentos onde estão os maiores 
                                desafios e possibilidades.  : Armazenamento, Mobilidade Elétrica e Geração Distribuída.`,
                        imageSrc: '/minas2050/src/images/post-instagram-2.png',
                        btnText: 'Quero participar',
                        btnLink: 'https://www.sympla.com.br/geracao-de-energia-fontes-energeticas-para-o-futuro__370920'
                    },
                    {
                        title: 'Transmissão de energia',
                        description: `O evento abordará o tema “Transmissão, redes em 2050”, ou seja, 
                                os desafios e tendências dessa fase do Sistema Elétrico Nacional, 
                                que conecta a Geração à Distribuição, fazendo a energia elétrica chegar onde é demandada.`,
                        imageSrc: '/minas2050/src/images/post-instagram-4.png',
                        btnText: 'Quero participar',
                        btnLink: 'https://www.sympla.com.br/transmissao-de-energia-redes-em-2050__370922'
                    },
                    {
                        title: 'EFICIÊNCIA ENERGÉTICA, competividade energética em 2050 ',
                        description: `No dia 22/11 próximo o Minas 2050 abordará o tema Eficiência Energética, à luz de pesquisas
                                e estudos do CEFET-MG, UNICAMP e CEMIG. Indústrias e negócios globalmente competitivos, 
                                assim como o bem estar das pessoas, dependem decisivamente do grau de eficiência energética que conseguiremos
                                imprimir ao Sistema Elétrico Nacional. Discutiremos possibilidades e tendências para 2050.`,
                        imageSrc: '/minas2050/src/images/post-instagram-2.png',
                        btnText: 'Quero participar',
                        btnLink: 'https://www.sympla.com.br/geracao-de-energia-fontes-energeticas-para-o-futuro__370920'
                    },
                    {
                        title: 'CENÁRIOS ENERGÉTICOS EM 2050, desafios e oportunidades',
                        description: `No dia 29/11 próximo será a conclusão das discussões sobre os Cenários Energéticos para 2050. 
                                O Engº Elétrico Prof. Dr. Hani Camille Yehia, da UFMG, apresentará uma síntese de todos os temas apresentados
                                e discutidos: Matriz Energética, Geração, Transmissão, Distribuição e Eficiência Energética, envolvendo possibilidades, desafios e oportunidades.`,
                        imageSrc: '/minas2050/src/images/post-instagram-4.png',
                        btnText: 'Quero participar',
                        btnLink: 'https://www.sympla.com.br/transmissao-de-energia-redes-em-2050__370922'
                    }
                ]
            }
        }
    })

    Vue.component('EventsCalendar', {
        template: /*html*/ `
        <section id="events_calendar">
            <h2 class="section-title" v-html="eventsCalendarTitle"></h2>
            <h5 class="section-subtitle">{{eventsCalendarSubtitle}}</h5>
            <div class="calendar-wrapper">
                <div id="interactive_calendar"></div>
                <aside id="event_details_wrapper">
                    <ul v-if="hasEvents">
                        <li class="event-details" v-for="event in eventsList" v-show="event.isVisible">
                            <div class="talk-details">
                                <img class="event-image" :src="event.eventImage" />
                                <div class="event-text">
                                    <span class="event-title article-title">{{event.eventTitle}}</span>
                                    <span class="event-description article-text" v-html="event.eventDescription"></span>
                                </div>
                            </div>
                            <!-- <div class="speaker-details">
                                <img class="speaker-image" :src="event.speakerImage" />
                                <div class="speaker-text">
                                    <span class="speaker-name article-title">{{event.speakerName}}</span>
                                    <span class="speaker-description article-text">{{event.speakerDescription}}</span>
                                </div>
                            </div> -->
                        </li>
                    </ul>
                </aside>
            </div>
        </section>`,
        props: {
            eventsCalendarTitle: {
                type: String,
                default: 'Calendário de <span class="blue-letters">Ev</span><span class="green-letters">ent</span><span class="red-letters">os</span>'
            },
            eventsCalendarSubtitle: {
                type: String,
                default: 'Clique na data referente e saiba mais'
            }
        },
        data() {
            return {
                selectedDate: '',
                eventsList: [
                    {
                        eventDate: '24/10/2018',
                        eventTitle: 'Projeções energéticas',
                        eventDescription: `
                            <b>HORÁRIO: 18h30min</b><br/>
                            <b>PROGRAMAÇÃO</b><br/>
                            <b>18h30min: Credenciamento e café com prosa</b><br/>
                            <b>19h00 – </b>Abertura<br/>
                            <b>19h10 - </b>Nelson José Hubner Moreira – Consultor<br/>
                            <b>19h40 - </b>André Frossard Pereira de Lucena – COPPE/UFRJ<br/>
                            <b>20h10 – </b>Painel com palestrantes + convidados<br/>
                            Leonardo Fares Menhem – Fumsoft<br/>
                            Leonardo Pontes Guerra – P7Criativo<br/>
                            Nelson José Hubner Moreira – Consultor<br/>
                            André Frossard Pereira de Lucena – COPPE/UFRJ<br/>
                            <b>20h50 – Encerramento e Networking</b><br/>
                            <b>21h00 - Confraternização</b><br/>
                        `,
                        eventImage: '/minas2050/src/images/post-instagram.png',
                        speakerName: 'Iron Man',
                        speakerDescription: 'Descrição do palestrante. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        speakerImage: '/minas2050/src/images/Iron_Man.png',
                        isVisible: false
                    },
                    {
                        eventDate: '31/10/2018',
                        eventTitle: 'Geração',
                        eventDescription: `
                            <b>PROGRAMAÇÃO</b><br/>
                            <b>18h30min: Credenciamento e café com prosa</b><br/>
                            <b>19h00 – </b>Abertura<br/>
                            <b>19h10 - </b>Hidráulica – Scott Wells Queiroz, Quebec Engenharia<br/>
                            <b>19h40 - </b>Biomassa – Douglas Martins – Siamig<br/>
                            <b>20h10 – </b>Solar - Antônia Sônia Alves Cardoso Diniz – Green Solar / PUCMinas<br/>
                            <b>20h40 – Encerramento e Networking</b><br/>
                            <b>21h00 - Confraternização</b><br/>
                        `,
                        eventImage: '/minas2050/src/images/post-instagram-2.png',
                        speakerName: 'Albert Einsten',
                        speakerDescription: 'Descrição do palestrante. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        speakerImage: '/minas2050/src/images/einsten.jpg',
                        isVisible: false
                    },
                    {
                        eventDate: '08/11/2018',
                        eventTitle: 'Transmissão',
                        eventDescription: `
                            <b>HORÁRIO: 18h30min</b><br/>
                            <b>PROGRAMAÇÃO</b><br/>
                            <b>18h30min: Credenciamento e café com prosa</b><br/>
                            <b>19h00 – </b>Abertura<br/>
                            <b>19h05 - </b>Raul Lycurgo Leite, TAESA<br/>
                            <b>19h45 - </b>Roberto Isao Kishinami, Consultor (confirmado)<br/>
                            <b>20h00 – </b>Frederico Ribas / Nelson Araujo, CEMIG<br/>
                            <b>20h15 – </b>Participação do público<br/>
                            <b>20h45 – </b>Encaminhamentos e Networking<br/>
                            <b>21h00 - Confraternização</b><br/>
                        `,
                        eventImage: '/minas2050/src/images/post-instagram-4.png',
                        speakerName: 'Iron Man',
                        speakerDescription: 'Descrição do palestrante. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        speakerImage: '/minas2050/src/images/Iron_Man.png',
                        isVisible: false
                    },
                    {
                        eventDate: '13/11/2018',
                        eventTitle: 'Distribuição',
                        eventDescription: `
                            <b>HORÁRIO: 18h30min</b><br/>
                            <b>PROGRAMAÇÃO</b><br/>
                            <b>18h30min: Credenciamento e café com prosa</b><br/>
                            <b>19h00 – </b>Abertura<br/>
                            <b>19h05 - </b>Armazenamento, Laboratório TESLA - UFMG<br/>
                            <b>19h25 - </b>Mobilidade elétrica – Braz de Jesus Cardoso Filho, UFMG / Tesla<br/>
                            <b>19h45 – </b>Geração distribuída – Ronaldo Gomes de Abreu, CEMIG<br/>
                            <b>20h05 – </b>Participação do público<br/>
                            <b>20h50 – </b>Encaminhamentos e Networking<br/>
                            <b>21h00 - Confraternização</b><br/>
                        `,
                        eventImage: '/minas2050/src/images/post-instagram.png',
                        speakerName: 'Albert Einsten',
                        speakerDescription: 'Descrição do palestrante. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        speakerImage: '/minas2050/src/images/einsten.jpg',
                        isVisible: false
                    },
                    {
                        eventDate: '22/11/2018',
                        eventTitle: 'Eficiência energética',
                        eventDescription: `
                            <b>HORÁRIO: 18h30min</b><br/>
                            <b>PROGRAMAÇÃO</b><br/>
                            <b>18h30min: Credenciamento e café com prosa</b><br/>
                            <b>19h00 – </b>Abertura<br/>
                            <b>19h05 - </b>Gilberto De Martino Jannuzzi, Unicamp<br/>
                            <b>19h45 - </b>Alexandre Heringer – Cemig<br/>
                            <b>20h00 – </b>Patrícia Jota – Cetec<br/>
                            <b>20h15 – </b>Participação do público<br/>
                            <b>20h50 – </b>Encaminhamentos e Networking<br/>
                            <b>21h00 - Confraternização</b><br/>
                        `,
                        eventImage: '/minas2050/src/images/post-instagram-2.png',
                        speakerName: 'Nikolas Tesla',
                        speakerDescription: 'Descrição do palestrante. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        speakerImage: '/minas2050/src/images/nikolas-tesla.jpg',
                        isVisible: false
                    },
                    {
                        eventDate: '29/11/2018',
                        eventTitle: 'Cenários energéticos (Síntese dos eventos anteriores)',
                        eventDescription: `
                            <b>HORÁRIO: 18h30min</b><br/>
                            <b>PROGRAMAÇÃO</b><br/>
                            <b>18h30min: Credenciamento e café com prosa</b><br/>
                            <b>19h00 – </b>Abertura<br/>
                            <b>19h05 - </b>Danilo Iglesias Brandão, UFMG<br/>
                            <b>19h45 - </b>Cemig<br/>
                            <b>20h00 – </b>Gasmig<br/>
                            <b>20h15 – </b>Fiemg<br/>
                            <b>20h30 – </b>Participação do público<br/>
                            <b>21h00 - </b>Encaminhamentos e Networking<br/>
                            <b>21h10 - Confraternização</b><br/>
                        `,
                        eventImage: '/minas2050/src/images/post-instagram-4.png',
                        speakerName: 'Nikolas Tesla',
                        speakerDescription: 'Descrição do palestrante. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        speakerImage: '/minas2050/src/images/nikolas-tesla.jpg',
                        isVisible: false
                    }
                ],
                eventDates: []
            };
        },
        mounted() {
            this.fillEventDatesArray();
            
            $('#interactive_calendar').datepicker({
                dateFormat: 'dd/mm/yy',
                dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
                dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                showOtherMonths: true,
                selectOtherMonths: true,
                monthNames: [
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ],
                monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                nextText: 'Próximo',
                prevText: 'Anterior',
                onSelect: selectedDate => {
                    this.selectedDate = selectedDate;
                },
                beforeShowDay: (date) => {
                    let dateFormated = $.datepicker.formatDate('dd/mm/yy', date);
                    let highlightDate = this.eventDates[dateFormated];

                    if (highlightDate) {
                        return [true, 'highlight', 'Há evento neste dia'];
                    }

                    return [true, ''];
                },
            });
        },
        computed: {
            hasEvents() {
                let eventsCount = 0;
                this.eventsList.forEach(item => {
                    if (this.selectedDate === item.eventDate) {
                        eventsCount += 1;
                        item.isVisible = true;
                    }
                    else {
                        item.isVisible = false;
                    }
                });

                if (eventsCount > 0) {
                    return true;
                } else return false;
            }
        },
        methods: {
            fillEventDatesArray() {
                this.eventsList.forEach(item => {
                    this.eventDates[item.eventDate] = item.eventDate;
                });
            }
        }
    });

    Vue.component('Speakers', {
        template: /*html*/ `
            <section id="speakers">
                <h2 class="section-title" v-html="speakersSectionTitle"></h2>
                <h5 class="section-subtitle">{{speakersSectionSubtitle}}</h5>
                <section class="speakers-list">
                    <article v-for="speaker in speakersList">
                        <h4 class="speaker-name article-title">{{speaker.name}}</h4>
                        <h5 class="speaker-position article-text">{{speaker.position}}</h5>
                        <img class="speaker-picture" :src="speaker.picture" />

                        <div class="speaker-overlay">
                            <h4 class="speaker-name article-title">{{speaker.name}}</h4>
                            <h5 class="speaker-position article-text">{{speaker.position}}</h5>
                            <div class="speaker-overlay-box">
                                <div class="talk-title">{{speaker.talkTitle}}</div>
                                <div class="talk-schedule">{{speaker.talkSchedule}}</div>
                            </div>
                        </div> 

                    </article>
                </section>
            </section>
        `,
        props: {
            speakersSectionTitle: {
                type: String,
                default: 'Nossos <span class="blue-letters">Pale</span><span class="green-letters">stra</span><span class="red-letters">ntes</span>'
            },
            speakersSectionSubtitle: {
                type: String,
                default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            }
        },
        data() {
            return {
                speakersList: [
                    {
                       name: 'Bebezão da Silva',
                       position: 'PO - Pampers',
                       talkTitle: 'Como fazer amigos e influenciar pessoas sendo um bebê',
                       talkSchedule: '18h - Berçario',
                       picture: '/minas2050/src/images/pampers-baby.jpg'
                    },
                    {
                        name: 'Bebezão da Silva',
                        position: 'PO - Pampers',
                        talkTitle: 'Como fazer amigos e influenciar pessoas sendo um bebê',
                        talkSchedule: '18h - Berçario',
                        picture: '/minas2050/src/images/pampers-baby.jpg'
                     },
                     {
                        name: 'Bebezão da Silva',
                        position: 'PO - Pampers',
                        talkTitle: 'Como fazer amigos e influenciar pessoas sendo um bebê',
                        talkSchedule: '18h - Berçario',
                        picture: '/minas2050/src/images/pampers-baby.jpg'
                     },
                     {
                        name: 'Bebezão da Silva',
                        position: 'PO - Pampers',
                        talkTitle: 'Como fazer amigos e influenciar pessoas sendo um bebê',
                        talkSchedule: '18h - Berçario',
                        picture: '/minas2050/src/images/pampers-baby.jpg'
                     }
                ]
            }
        }
    });

    Vue.component('CallToAction', {
        template: /*html*/ `
            <section id="call_to_action">
                <h2 class="section-title" v-html="ctaTitle"></h2>
                <default-button buttonType="secondary" :buttonLabel="ctaBtnLabel" :buttonLink="ctaBtnLink" buttonTarget="_blank"></default-button>
            </section>
        `,
        props: {
            ctaTitle: {
                type: String,
                default: 'Vamos construir <span class="blue-letters">ju</span><span class="green-letters">nt</span><span class="red-letters">os</span> esta história?'
            },
            ctaBtnLabel: {
                type: String,
                default: 'Ver todos os eventos'
            },
            ctaBtnLink: {
                type: String,
                default: 'http://www.fumsoft.com.br'
            }
        }
    });

    Vue.component('PastEvents', {
        template: /*html*/ `
            <section id="past_events">
                <h2 class="section-title" v-html="pastEventsSectionTitle"></h2>
                <h5 class="section-subtitle">{{pastEventsSectionSubtitle}}</h5>
                <section class="events-list">
                    <article v-for="event in pastEventsList">
                        <img class="event-picture" :src="event.picture" />
                        <h4 class="event-name article-title">{{event.name}}</h4>
                        <h5 class="event-date article-text">{{event.date}}</h5>
                        <default-button class="past-events-btn" :class="event.btnLink == '' ? 'disabled' : ''" buttonType="secondary" :buttonLabel="event.btnLabel" :buttonLink="event.btnLink" buttonTarget="_blank"></default-button>
                    </article>
                </section>
            </section>
        `,
        props: {
            pastEventsSectionTitle: {
                type: String,
                default: 'Eventos <span class="blue-letters">pas</span><span class="green-letters">sad</span><span class="red-letters">os</span>'
            },
            pastEventsSectionSubtitle: {
                type: String,
                default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            }
        },
        data() {
            return {
                pastEventsList: [
                    {
                        picture: '/minas2050/src/images/post-instagram-4.png',
                        name: 'TRANSMISSÃO',
                        date: '08/11',
                        btnLabel: 'EM BREVE',
                        btnLink: ''
                    },
                    {
                        picture: '/minas2050/src/images/post-instagram-5.png',
                        name: 'DISTRIBUIÇÃO',
                        date: '08/11',
                        btnLabel: 'EM BREVE',
                        btnLink: ''
                    },
                    {
                        picture: '/minas2050/src/images/post-instagram.png',
                        name: 'PROJEÇÕES ENERGÉTICAS',
                        date: '31/10',
                        btnLabel: 'VER CONTEÚDO COMPLETO',
                        btnLink: 'http://www.fumsoft.com.br/'
                    },
                    {
                        picture: '/minas2050/src/images/post-instagram-2.png',
                        name: 'GERAÇÃO',
                        date: '24/10',
                        btnLabel: 'VER CONTEÚDO COMPLETO',
                        btnLink: 'http://www.fumsoft.com.br/'
                    }
                ]
            }
        }
    });

    Vue.component('FooterArea', {
        template: /*html*/ `
            <section id="footer">
                <div class="footer-text section-title" v-html="footerText"></div>
                <div class="footer-images">
                    <img :src="footerLogo" />
                </div>
            </section>
        `,
        props: {
            footerText: {
                type: String,
                default: '<span class="blue-letters">REAL</span><span class="green-letters">IZA</span><span class="red-letters">ÇÃO:</span>'
            },
            footerLogo: {
                type: String,
                default: '/minas2050/src/images/logo-rodape.png'
            }
        }
    });

    new Vue({
        el: '#landing_page',
        data: {
            message: 'Hello world'
        }
    });
});