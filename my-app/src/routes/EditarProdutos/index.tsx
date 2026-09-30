import { useParams } from "react-router";

export default function EditarProdutos() {
  //Através do destructuring, podemos acessar os dados do objeto e atribuir a variáveis
  //const { } = object
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h2>Editar Produtos</h2>
      <h1> {id} </h1>
    </main>
  )
}
