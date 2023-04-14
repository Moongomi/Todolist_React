import RandomTodo from "./RandomTodo";
import { useParams } from "react-router-dom";

function RandomTodoPage() {
    const { text } = useParams();
  
    return (
        
        
      <div>
         <RandomTodo text={text} />
      </div>
      
    );
  }
export default RandomTodoPage;