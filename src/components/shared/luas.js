import React from "react";

export default class Luas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            luas:[],
            load:false
        }
    }

    async fazerRequisicao(moon){
        let lua = await fetch("http://localhost:3000/api/"+moon+".json");
        let dados = await lua.json();
        return dados;
    }

    componentDidMount(){
        this.fazerRequisicao(this.props.planet).then((data)=>{
            let s = this.state;
            s.luas = data.satellites;
            s.load = true;
            this.setState(s);
        })
    }

    render(){
        if(this.state.load){
            return(
                <div>
                    {this.state.luas.map((moons)=>{
                        return(
                          <li key={Math.random()*6754839}>{moons.name}</li>
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
}