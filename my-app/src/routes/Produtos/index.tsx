import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";
import { FaRegEdit as Editar} from "react-icons/fa";
import { RiDeleteBinLine as Excluir} from "react-icons/ri";

export default function Produtos() {

    //Recipiente onde irei guardar a lista de produtos
    const[produtos,setProduto] = useState<TipoProduto[]>([]);

    useEffect( ()=>{

        const carregarProdutos = async ()=>{
            try {
                const resposta = await fetch("http://localhost:3001/produtos");

                if(!resposta.ok){
                    throw new Error(`Erro no fetch da resposta dos produtos: ${resposta.status} - ${resposta.statusText}`);
                }

                const data:TipoProduto[] = await resposta.json();
                console.log(data);
                setProduto(data);

            } catch (error) {
                console.error(error);
            }

        }

        carregarProdutos();

    },[]);

    return (
        <main>
            <h2>Produtos</h2>
            <table border={1} style={{width:"100%", borderCollapse:"collapse"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>PREÇO</th>
                        <th>ESTOQUE</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map( (p)=>(

                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.preco}</td>
                                <td>{p.estoque}</td>
                                <td>
                                    <Link to={`/editar-produtos/${p.id}`}> <Editar/> </Link>  | 
                                    <Link to="#" onClick={()=> confirm("Deseja realmente excluir?")}> <Excluir/> </Link>  | 
                                </td>
                            </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>Quantidade de Produtos: {produtos.length}</td>
                    </tr>
                </tfoot>
            </table>
        </main>
    )
}
