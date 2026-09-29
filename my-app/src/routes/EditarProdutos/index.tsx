import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";

export default function EditarProdutos() {

  const navigate = useNavigate();

      //Através do destructuring, podemos acessar os dados do objeto e atribuir a variáveis
      //const { } = object
      const { id } = useParams<{id: string}>();

      const [produto, setProduto] = useState<TipoProduto>({id:"", nome:"", preco:0, estoque:0});

      useEffect(()=>{

        const carregarProduto = async () => {
          try {
            const resposta = await fetch('http://localhost:3001/produtos/${id}');

            if (!resposta.ok) {
              throw new Error(`Erro no fetch da resposta do produto: ${resposta.status} - ${resposta.statusText}`);
            }

            const data: TipoProduto = await resposta.json();
            console.log(data);
            setProduto(data);

          } catch (error) {
            console.error(error);
          }

        }
        carregarProduto();

      },[]);

      const handleUpdate = async ()=>{
        try{

          const response = await fetch('http://localhost:3001/produtos/${produto.id}', {
            method: "PUT",
            headers:{
              "Content - Type":"application/json"
            },
            body:JSON.stringify (produto)
          });

          if(response.ok){
            throw new Error('Ocorreu um erro na atualização do produto: ${response.status} - ${response.statusText}')
          }

          alert("Produto atualizado com sucesso!")

          navigate("/produtos");


        }catch (error){
          console.error(error);
        }
      }



  return (
    <main>
        <h2>Editar Produtos</h2>
        <div>
          <form>
            <fieldset>
              <legend>Dados do Produto</legend>
              <div>
              <label htmlFor="nome">Nome do produto</label>
              <input type="text" name="nome" id="nome" value={produto.nome} 
              onChange={(e)=> setProduto({...produto, nome: e.target.value})}/>
              </div>
            <div>
              <label htmlFor="preco">Preço do produto</label>
              <input type="number" name="preco" id="preco" value={produto.preco}
                onChange={(e) => setProduto({ ...produto, preco: parseFloat (e.target.value) })} />
              <div>
                <label htmlFor="estoque">Estoque do produto</label>
                <input type="number" step={1} name="estoque" id="estoque" value={produto.estoque}
                  onChange={(e) => setProduto({ ...produto, estoque: parseInt(e.target.value) })} />
              </div>
              <div>
                <button type="button" onClick={handleUpdate}>ATUALIZAR</button>
              </div>
            </div>
            </fieldset>
          </form>
        </div>
    </main>
  )
}
