import React, { Component } from 'react'
import '../App.css'

function BarGroup(props) {
    let barPadding = 2
    let barColour = '#0271c7'
    let widthScale = d => d * 10

    let width = widthScale(props.d.stat)
    let yMid = props.barHeight * 0.5

    return <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.month}</text>
      <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.stat}</text>
    </g>
  }

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
         data:[]
        }
    }
componentDidMount() {
    fetch("https://demo5636362.mockable.io/stats")
        .then(res => res.json())
        .then(
        (result) => {
           console.log('result',result)
           this.setState({
               data:result.data
           })
        },
        (error) => {
            console.log('error',error)
        }
        )
    }
    render() {
        let barHeight = 30
        let barGroups= null
        let data2=[]

        if(this.state.data){
        Object.keys(this.state.data).map((val)=>{
            data2.push({'month':this.state.data[val].month,'stat':parseInt(this.state.data[val].stat)})
        })
    }
        if(data2){
        barGroups = data2.map((d, i) => <g transform={`translate(0, ${(i * barHeight)})`}>
                                                      <BarGroup d={d} barHeight={barHeight} />
                                                    </g>)
                                                    localStorage.setItem("stats", barGroups);
        }
        return (
          <div className='graphStyle'>
            <div className='login-msg'>Stats</div>
<svg width="100%" height="500" >
            <g className="container">
              <g className="chart" transform="translate(100,60)">
                {barGroups}
              </g>
            </g>
          </svg>
          </div>
            
        )
    }
}
