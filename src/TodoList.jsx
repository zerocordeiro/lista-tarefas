
import React, {useState, useEffect} from "react";
import'./TodoList.css';
import Icone from './assets/icone.gif';

function TodoList(){

    const listaStorage = localStorage.getItem('Lista');
    // verifico o local storage se há um item chamado lista



    // const[lista, setLista] = useState([]);
    // versão da página antes de utilizar o storage para armazenar a lista. Abaixo a versão nova
    const[lista, setLista] = useState(
        listaStorage ? JSON.parse(listaStorage) : []
        // Verifica se tem lista armazenada no local storage. Se tiver, precisa convertê-la de volta de string para objeto - itens salvos no storage são salvos como string, e não como objetos, por isso é preciso usar o JSON.parse
    );
    const[novoItem, setNovoItem] = useState("");
    // esta é a variàvel que captura o que é digitado no input para depois adicionar ao array que forma a lista.

    useEffect(
        ()=>{
            localStorage.setItem('Lista', JSON.stringify(lista));
        // acessa o localStorage e salva nele a lista convertida para string com o nome 'Lista'
        }, [lista]
        // toda vez que ocorre uma mudança na lista o efeito definido antes da vírgula acontece
        // monitora o item lista
    )

    function adicionaItem(form){
        form.preventDefault();
        // impede que recarregue a página
        if(!novoItem){
            
            return (document.getElementById('input-entrada').focus());
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        // ^esta sintaxe com '...lista' e os outros parâmetros depois da vírgula quer dizer que deve-se pegar o estado atual de lista e acrescentar o que está indicado, ou seja, adicionar o novoItem como um novo item no array.
        // Cria-se uma lista de objetos com os parâmetros 'texto', composto pelo que é digitado no input, e 'isCompleted', que é um atributo booleano.
        setNovoItem("");
        // esvazia-se o conteúdo do input
        document.getElementById('input-entrada').focus();
        // manda focar no input novamente
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted ;
        setLista(listaAux);
        // Esta função faz com que, ao clicar sobre um item da lista, o código usa o index dele para identificar qual o item que foi clicado e troca o valor do seu parâmetro isCompleted de true para false e vice-versa
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        // splice (posição em que inicia, quantos itens deletar a partir do início)
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

    return(
        <div>
            <h1>Lista de Tarefas</h1> 
            <form onSubmit={adicionaItem}>
                <input 
                    id='input-entrada'
                    type="text"
                    placeholder='Adicione uma tarefa'
                    value={novoItem}
                    // isto faz com que o valor preenchido no campo de input seja limpo toda vez que é feita a adição do item na lista, pois como a função adiccionaItem tem um comando que impede que a página seja recarregada, isso faria com que o input continuasse com o valor digitado após adicioná-lo à lista. (cont)
                    // Mas a função adicionaItem também "esvazia" o novoItem após adicioná-lo à lista, então fazendo com que o value receba novoItem, fazemos com que ele se esvazie após cada adição à lista.
                    onChange={(e)=>{setNovoItem(e.target.value)}}
                />
                <button className="add" type='submit'>Add</button>
            </form>
            <div className='listaTarefas'>
                <div style={{textAlign:'center'}}>
                {
                    lista.length < 1
                    ?
                    <img className='icone-central' src={Icone} />
                    :
                    lista.map((item,index)=>(
                        <div 
                        // className='item'
                        className={item.isCompleted?'item completo':'item'}
                        key={index}
                        >
                        <span
                            onClick={()=>{clicou(index)}}
                        >
                            {item.text}
                        </span>

                        <button 
                            onClick={()=>{deleta(index)}}
                            className="del">Deletar</button>
                        </div>
                    ))
                    
                }
                </div>
                
                
                {/* <div className='item completo'>
                    <span>Tarefa de exemplo</span>
                    <button className="del">Deletar</button>
                </div> */}
                
                {
                    lista.length > 0 &&
                    <button 
                    onClick={()=>{deletaTudo()}}
                    className="deleteAll">Deletar todas</button>
                }
                
                
            </div>
        </div>
    )
}

export default TodoList