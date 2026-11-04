Um financeiro recebe arquivos de cobrança e precisa registrar cada lote no ERP. O caminho fácil é automatizar o envio de um arquivo válido. O teste que decide se a rotina pode entrar em produção é outro. O ERP recebeu o lote, mas a conexão caiu antes da resposta. O que acontece se a automação tentar novamente?

## Dê uma identidade à operação

Use uma chave que represente o lote de negócio, como o identificador do fornecedor e o número do lote. Guarde essa chave junto com o estado da execução. Se a integração aceitar uma chave de idempotência, envie a mesma chave em todas as tentativas. Se a resposta for ambígua e o sistema de destino não oferecer esse recurso, consulte o destino ou encaminhe para revisão antes de enviar de novo.

O nome do arquivo por si só pode mudar num reenvio. Use a regra que a operação reconhece como “este é o mesmo lote” e teste arquivos duplicados, corrigidos e parcialmente processados.

## Separe falhas temporárias de casos para revisão

Uma indisponibilidade breve pode justificar nova tentativa com intervalo e limite definidos. Um cadastro ausente ou um valor incompatível com a regra de negócio costuma exigir uma decisão humana. Registre o motivo, o responsável e a ação possível. A fila de revisão precisa mostrar o suficiente para resolver o caso sem espalhar dados sensíveis em logs ou alertas.

## Teste o desligamento junto com o funcionamento

Num piloto, compare a saída da automação com a rotina atual antes de enviar registros de verdade. Depois, ative um grupo pequeno e teste três situações. Reenvio do mesmo lote, queda durante a gravação e retomada depois de corrigir uma pendência.

Combine quem pode pausar o fluxo e como a equipe retoma o trabalho manual. Na primeira revisão, conte tempo de execução, intervenções manuais e resultados incorretos. Uma automação está pronta para crescer quando a equipe consegue reconhecer e tratar as falhas que realmente ocorrem.

Veja também [como medir se um processo melhorou](/blog/como-acompanhar-e-melhorar-processos).
