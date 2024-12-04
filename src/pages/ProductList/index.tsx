import axios from "axios";
import { useEffect, useState } from "react";

type Fact = {
    id: number,
    type: string,
    text: string,
    createdDate: string
  };
  
  // const normalizeData = (Data:any)
  
  function formatDate(DateForFormatted: Date): string {
    const pad = (i: number) => (i < 10) ? "0" + i : "" + i;
  
    return `${DateForFormatted.getFullYear()}.${pad(1 + DateForFormatted.getMonth())}.${pad(DateForFormatted.getDate())}, ${pad(DateForFormatted.getHours())}:${pad(DateForFormatted.getMinutes())}:${pad(DateForFormatted.getSeconds())}`
  }
  
  function normalizeData(data: any[]): Fact[] {
    return data.map((item, index):Fact => {
      let formattedDate = formatDate(new Date(item.createdAt));
      // const formattedDate = ${String(createdDate.getDate()).padStart(2, '0')}.${String(createdDate.getMonth() + 1).padStart(2, '0')}.${createdDate.getFullYear()}, ${String(createdDate.getHours()).padStart(2, '0')}:${String(createdDate.getMinutes()).padStart(2, '0')};
  
      return {
        id: index + 1, // Нумерация от 1 до n
        type: item.type,
        text: item.text,
        createdDate: formattedDate
      };
    });
  }
  

export const ProductList = (aarr:any) => {
    const [DataApi, setDataApi] = useState<Fact[]>()
    useEffect(() => {
      const apiUrl = 'https://cat-fact.herokuapp.com/facts';
      axios.get(apiUrl).then((resp: any) => {
        const allData = resp.data;
        const normalizedData = normalizeData(allData);
        setDataApi(normalizedData);
      });
    }, []);
  
  
  
    return (

<div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a>
        <section style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
        {
          DataApi?.map(elem => {return <div key={elem.id}>{elem.text}</div>})
        }
        </section>

      </header>
    </div>
    )
}

