# Prompt para o Antigravity — Studio Petra Beauty

Crie um site completo, funcional, responsivo e visualmente autoral para o **Studio Petra Beauty**, usando esta pasta como projeto. A prioridade máxima é reproduzir a **linguagem de movimento** do vídeo de referência: https://pin.it/167hkc6KU (Pin canônico: https://br.pinterest.com/pin/606437906084356264/). Antes de implementar, assista ao vídeo de 10 segundos quadro a quadro. Não copie o conteúdo, o nome nem as fotos do exemplo de skincare; adapte sua direção de arte e sua coreografia visual ao Studio Petra Beauty. Use exclusivamente as fotografias reais já fornecidas em `assets/fotos-reais/` para representar trabalhos e ambiente do estúdio. Leia também `MAPA-DOS-ASSETS.md`.

## O que reproduzir da referência

O vídeo apresenta um site editorial de beleza como uma cena cinematográfica: uma grande janela de conteúdo de cantos suaves em meio a um fundo claro; fotografia de beleza em escala generosa; letras enormes parcialmente visíveis atrás da cena; texto curto disposto com bastante respiro; mudanças de cena por deslizamento e revelação de máscaras; camadas que se movem em velocidades ligeiramente diferentes e dão profundidade. A abertura é clara e delicada, uma transição revela uma tela mais escura e íntima e a composição se reorganiza sem parecer um carrossel comum. Reproduza sobretudo **ritmo, enquadramento, direção de entrada e saída, sobreposição e continuidade espacial**. Animações genéricas de fade-up em todos os blocos não atendem a esta referência.

## Coreografia obrigatória da hero

1. Estado inicial: fundo marfim rosado, palavra editorial muito grande e de baixa opacidade ao fundo, janela central com bordas arredondadas discretas e fotografia real de uma noiva. Cabeçalho enxuto integrado ao layout. Texto principal claro, legível e com espaço para respirar. Use `hero-noiva-jercilane.jpg` como foto central e `detalhe-coroa-noiva.jpg` em um detalhe editorial secundário, sem tapar o rosto.
2. Entrada: fundo e moldura já aparecem; imagem se revela por uma máscara lateral/vertical suave, com leve escala de aproximadamente 1,06 para 1; o título entra por linhas recortadas, com atraso discreto entre linhas. Duração total aproximada de 1,4–1,8 s, sem elasticidade ou quique.
3. Transição para a segunda cena: a janela permanece como âncora visual enquanto a fotografia se desloca, cresce sutilmente e a nova cena ocupa o mesmo espaço. O texto sai por máscara no sentido oposto ao de entrada. Uma camada vinho profundo atravessa a área da janela e revela o trabalho de maquiagem. Mantenha algum elemento estável para que a troca tenha continuidade, como no vídeo. Use `portfolio-formanda-lorena.jpg` e depois `portfolio-maquiagem-josyane.jpg` ou `portfolio-maquiagem-iasmim.jpg`.
4. A passagem para a terceira cena volta a um fundo claro e aproxima detalhes do rosto/olhar. Use uma troca de enquadramento com máscara e parallax leve, sem giro de cartão, flip 3D, partículas, brilhos artificiais ou transições de template. A sessão posterior pode destacar sobrancelhas/cílios com as fotos correspondentes.
5. O usuário deve conseguir acompanhar as cenas pelo scroll, com progressão controlada e previsível. No desktop, a sequência inicial pode ficar fixada durante uma curta parte da rolagem; depois, a página segue naturalmente. Se a referência funcionar melhor como animação inicial breve, reproduza a entrada uma única vez e dê controle de navegação por scroll. Não deixe conteúdo preso em loop automático nem torne a leitura difícil. No mobile, preserve a mesma gramática visual em uma composição vertical sem empilhar camadas sobre rostos.
6. Use curvas de animação suaves e desaceleração elegante. Como ponto de partida: 600–900 ms por troca principal, 80–140 ms de diferença entre linhas de texto, e deslocamentos moderados. Ajuste comparando com o vídeo; fidelidade perceptiva é mais importante que números fixos.

## Direção visual do Studio Petra Beauty

Marca: elegante, feminina e acolhedora, com beleza real e acabamento editorial. A direção pode partir de marfim, rosa queimado, vinho profundo e pequenos acentos dourados inspirados nas fotos do perfil; trate a paleta como proposta até encontrar identidade oficial. Tipografia: combine uma serifada editorial sofisticada para chamadas com uma sans limpa para navegação e leitura. Sem cursiva genérica e sem excesso de efeitos. O rosto e a qualidade do trabalho devem ser o foco. Não altere a aparência das clientes com geração de IA, filtros de pele ou recortes agressivos.

Não invente logotipo. Se a pasta não tiver um arquivo oficial, use uma assinatura tipográfica provisória “Studio Petra Beauty” até que o logotipo seja fornecido. Não reutilize a foto do perfil como logotipo.

## Conteúdo confirmado no Instagram @studio.petrabeauty

- Nome exibido: Studio Petra Beauty | Maquiagem em SMJ.
- Mensagem de apresentação: “Transformamos beleza, realçamos sua essência!”
- Serviços citados: maquiagem blindada, cílios, sobrancelhas; trabalhos de noivas, formandas e ocasiões especiais. O perfil também mostra penteados e curso de automaquiagem.
- Localização divulgada nos posts: Santa Maria de Jetibá, ES. Não invente endereço completo.
- Link de contato mostrado no perfil: `https://wa.me/27999108197`. Use o link do perfil e confirme seu funcionamento antes da entrega.
- Instagram: `https://www.instagram.com/studio.petrabeauty/`.

Escreva textos curtos, naturais e específicos. Sugestão para a hero: **“Sua beleza, do seu jeito.”** Subtexto: “Maquiagem e produções pensadas para realçar quem você é — dos momentos especiais aos detalhes de todos os dias.” CTA principal: “Agendar meu momento”. CTA secundário: “Conhecer os trabalhos”. Revise a cópia para que serviços, fotos e promessas correspondam ao que o perfil efetivamente mostra. Não invente preços, avaliações, números de clientes, certificações, endereço ou depoimentos.

## Estrutura do site

1. Hero cinematográfica com sequência de 3 cenas e CTA sempre acessível.
2. Bloco breve sobre o estúdio e sua forma de atender, com `studio-ambiente.jpg`.
3. Serviços apresentados editorialmente: Dia da Noiva; Maquiagem para eventos/formaturas; Cílios e sobrancelhas; Penteados; Curso de automaquiagem. Trate os detalhes de cada serviço com textos fiéis ao perfil.
4. Portfólio com fotos reais organizadas por categoria. Use legenda curta e descritiva; tenha cuidado com fotos que já contêm texto, como a sequência de brow lamination.
5. Experiência de atendimento / processo, sem inventar etapas comerciais rígidas. Mostrar acolhimento, personalização e preparação.
6. CTA final para WhatsApp, com Instagram como alternativa.
7. Rodapé com nome, cidade e links reais.

## Requisitos de implementação

- Entregue código pronto para rodar nesta pasta, com assets locais e caminhos relativos. Não use URLs temporárias do CDN do Instagram no site.
- Preserve proporção e enquadramento das fotos; use `object-position` por imagem para nunca cortar rosto, maquiagem ou penteado de forma ruim.
- Visual responsivo de 320 px até desktop largo. Teste pelo menos 390 px, 768 px e 1440 px.
- Faça as transições com elementos HTML reais. Pode usar uma biblioteca de animação consolidada se ela ajudar a sincronizar máscaras, rolagem e parallax; evite dependência pesada sem benefício claro.
- Carregue somente as primeiras imagens necessárias à hero; aplique lazy loading ao restante e otimize arquivos para web sem sobrescrever os originais nesta pasta.
- A navegação, os botões, o WhatsApp, o portfólio e os controles de cena precisam funcionar. O site não pode depender de vídeo para apresentar todo o conteúdo.
- Respeite `prefers-reduced-motion`: preserve toda a informação e troque os movimentos longos por transições mínimas.
- Garanta foco visível, contraste suficiente, textos alternativos específicos e controles acessíveis por teclado.
- Evite fotos de banco, modelos geradas por IA, mockups de celular, efeitos de brilho, partículas, cursor customizado e carrossel convencional. A beleza da referência vem de enquadramento, tipografia e coreografia.

## Critério de aceite

Antes de encerrar, abra a referência e compare sua hero com ela lado a lado. Verifique especialmente: composição da janela, escala da fotografia, letras de fundo, troca claro/escuro, movimento por máscaras e fluidez entre as três cenas. Faça capturas de desktop e mobile do resultado e corrija sobreposição, cortes de rosto, saltos de layout e qualquer animação que pareça pronta de template. Entregue o site completo e diga quais informações ainda dependem da cliente (como logo oficial, endereço ou aprovação das fotos para publicação).
