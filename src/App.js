import React from 'react';

import Luas from "../src/components/shared/luas";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     planets:[],
     load:false
    }
  
    this.removerPlaneta = this.removerPlaneta.bind(this);
    this.duplicarPlaneta = this.duplicarPlaneta.bind(this);
  }

  async fazerRequisicao(){
    let planets = await fetch("http://localhost:3000/api/planets.json");
    let dados = await planets.json();
    return dados;
  }

  removerPlaneta(){
    let s = this.state;
    s.planets.pop();
    this.setState(s);
  }

  duplicarPlaneta(){
    let s = this.state;
    let planeta = s.planets[s.planets.length - 1];
    s.planets.push({
      key:Math.random() * 999999,
      nome:planeta.nome,
      desc:planeta.desc,
      url:planeta.url
    })
    this.setState(s);
  }

  componentDidMount(){
    this.fazerRequisicao().then((data)=>{
      let s = this.state;
      s.planets = data.planets;
      s.load = true;
      this.setState(s);
    })
  }

  render(){
    if(this.state.load){
      return(
        <div>
          {this.state.planets.map((planet)=>{
            return(
              <div key={planet.id}>
                <h2>{planet.name}</h2>
                <img src={planet.img_url} />
                <p>{planet.description}</p>
                <h4>Luas</h4>
                <ul>
                  <Luas planet={planet.id} />
                </ul>
              </div>
            )
          })}
        </div>
      )
    }else{
      return(
        <div>
          <span>Loading...</span>
        </div>
      )
    }
  }
  /**
  render(){
    return(
      <div>
        /**Listando os planetas com map e usando states 
        {this.state.planets.map((planets)=>{
          return(
            <div key={planets.key} onClick={()=>{
              alert("clicou no planeta " + planets.nome)
            }}>
              <h1>{planets.nome}</h1>
              <p>{planets.desc}</p>
            </div>
          )
        })}
        <div>
          <button onClick={this.removerPlaneta}>Remover planeta</button>
          <button onClick={this.duplicarPlaneta}>Duplicar planeta</button>
        </div>
      </div>
    )
  }
  */
}