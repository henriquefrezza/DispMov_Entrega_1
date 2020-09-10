class Jogo extends React.Component{
  render(){
    return (
      <div className="game">
        <div className="game-board">
          <Tabuleiro/>
        </div>
        <div className="game-info">
          <span>{"Movimentos"}</span>
        </div>
      </div>
    );
  }  
}

class Tabuleiro extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      jogadas: 0,
      quadrados: Array(9).fill(null),
      xIsNext: true
    }
  }
  
  render (){
    const vencedor = calculateWinner(this.state.quadrados);
    const status = vencedor ? ('Vencedor: ' + vencedor) : ('Jogador: ' + (this.state.xIsNext ? 'X' : 'O')); 
    return (
      <div>
        <div>{status}</div>
        <div className="board-row">
          {this.renderizarQuadrado(0)}
          {this.renderizarQuadrado(1)}
          {this.renderizarQuadrado(2)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(3)}
          {this.renderizarQuadrado(4)}
          {this.renderizarQuadrado(5)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(6)}
          {this.renderizarQuadrado(7)}
          {this.renderizarQuadrado(8)}
        </div>
        <div>
          {this.reiniciarButton()}
        </div>
        <div>
          {this.randomButton()}
        </div>
      </div>
    );
  }
  
reiniciarButton() {
  return (
    <button 
      className="button" 
      onClick={() => this.setState({
        jogadas: 0,
        quadrados: Array(9).fill(null), 
        xIsNext: true
      })}>{"Reiniciar jogo"}</button>
  )
}
  
randomButton() {
  return (
    <button 
      className="button" 
      onClick={() => this.randomClick()}>{"Aleatório"}
      </button>
  )
}
  
randomClick() {
  const quadrados = this.state.quadrados.slice();
  var i = Math.floor(Math.random() * 9);
  if (quadrados[i] == null) this.handleClick(i);
  else {
    if (this.state.jogadas >= 9){
      alert ('Jogo já acabou');
      return;
    }
    else this.randomClick();
  }
}
  
renderizarQuadrado(i) {
    return (
      <Quadrado
        value={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
handleClick(i){
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)){
      alert ('Jogo já acabou');
      return;
    }
    if (quadrados[i]){
      alert('Quadrado ocupado!')
      return;
    }
    quadrados[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      jogadas: this.state.jogadas + 1, 
      quadrados: quadrados, 
      xIsNext: !this.state.xIsNext
    });
  }
}

class Quadrado extends React.Component {
  /*constructor (props){
    super (props);
    this.state = {
      value: null,
    };
  }*/
  
  render (){
    return (
      <button
        className="square"
        onClick= {this.props.onClick}
        >
        {this.props.value}
      </button>
    );
  }
}

function calculateWinner (quadrados){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])
      return quadrados[a];
  }
  return null;
}

/*function Quadrado (props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}*/

ReactDOM.render (
  <Jogo />,
  document.getElementById("root")
);