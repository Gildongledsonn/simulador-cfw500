# Revisão dos módulos — 13/09/2026

Integrados à bancada: modelo ideal de fases 380/220 V, bobinas de 220 V CA, contatos, selo/parada, soltura por pointer capture e reconhecimento de estrela/triângulo. Capacitores e resistores não são fios. O secundário isolado do transformador é 24 V CA, com 220 V no primário. Pontos da mesma fase têm 0 V entre si; circuitos flutuantes ou com fontes em conflito são indeterminados.

Verificação: `npm test` e `npm run build`. O workflow executa os testes de autenticação e circuitos antes da publicação.

O conteúdo distingue corrente nominal de corrente de partida direta e explica a compatibilidade de placa/rede e o tempo morto. Em estrela-triângulo na rede 380 V, o motor deve admitir 380 V em triângulo. O fechamento simultâneo é inválido. As aulas sobre autotransformador e revezamento são estudos de esquema, pois os respectivos componentes completos não estão disponíveis no catálogo.

Limites: não calcula torque, corrente de partida, carga mecânica, corrente de curto ou curva de proteção. As funções de temporização estrela-triângulo e aquecimento do relé têm testes unitários, mas não estão integradas à interface atual. O relé de segurança é ilustrativo e não valida categoria/PL. Esta revisão corrige as afirmações anteriores deste arquivo sobre recursos ausentes na bancada.

Forno Inova: pinagem do conector pluggable revisada, termopar 1(-)/2(+), contatos S4 em série no exemplo (fase em 24, carga em 25, comum 26 sem cabo externo). A conectividade das fontes, retornos, HV, sensores e PE é independente da cor dos cabos. Inclui exemplo, tentativas/intervalos, segundo sensor opcional, atraso do gás, histerese e vapor U-L/U-d com F-10/F-11. Falhas desligam saídas e exigem nova partida manual; sair do módulo encerra o relógio.

Limites do forno expostos na tela: térmica acelerada, chama inferida da ligação, modo gás fixo e menus/teclas simplificados; sem PID, purga, porta, temporizador de processo ou vapor momentâneo U-L=0. Parâmetros não implementados são somente consulta. A página temporária de revisão visual não integra a publicação.

A validação de sessão no servidor foi preservada, corrigindo a regressão pendente que confiava apenas em localStorage.

Referências: [Inova MN189V10.12](https://www.inova.ind.br/images/YB1-11-J-H-F.pdf), [guia WEG](https://static.weg.net/medias/downloadcenter/haa/h53/WEG-guia-de-selecao-de-partidas-50037327-manual-portugues-br-dc.pdf), [manual NR-12 do MTE](https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/manuais-e-publicacoes/manual-de-aplicacao-da-nr-12.pdf) e [NR-10 do MTE](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10).
