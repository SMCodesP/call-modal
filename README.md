# call-modal

## Descrição

Um simples HOC (Higher Order Component) para chamar um modal de qualquer lugar, sem renderizá-lo no mesmo

## Instalação

```bash
npm install call-modal
```

## Uso

```js
import { withGlobalCall } from 'call-modal';

interface YourModalProps {
  // your props
}

const YourModal: FC<YourModalProps> = () => {
  return (...)
}

export default withGlobalCall(YourModal);
```

```tsx
import YourModal from './YourModal';

const Component = () => {
  const onCallModal = () => {
    YourModal.show();

    setTimeout(() => {
      YourModal.hide();
    }, 3000);
  };

  return (
    <div>
      <button onClick={onCallModal}>call modal</button>
    </div>
  );
};
```

```tsx
import { ModalContainer } from 'call-modal';

const App = () => {
  return (
    <>
      <ModalContainer />

      <Component />
    </>
  );
};
```

## Explicação

O pacote `call-modal` fornece um HOC chamado `withGlobalCall` que permite chamar um modal de qualquer lugar da sua aplicação. Para usar o `withGlobalCall`, importe o seu modal desejado e envolva-o com o `withGlobalCall`, como no exemplo acima com SeuModal.

O `withGlobalCall` adiciona as funções show e hide ao componente envolvido. No exemplo acima, essas funções são chamadas dentro da função onCallModal, que é acionada quando o botão `chamar modal` é clicado.

O `setTimeout` é usado apenas como um exemplo para ocultar o modal após 3 segundos. Você pode personalizar o comportamento de exibição e ocultação do modal de acordo com as necessidades da sua aplicação.

Com suporte a TypeScript.
