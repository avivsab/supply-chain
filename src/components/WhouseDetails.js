import React, { Component } from 'react'
import styled from 'styled-components'

const Upper = styled.span`
  text-transform: uppercase;
  text-decoration: underline;
`;
export class WhouseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            quantity: 0,
            expired: null,

        };
    }
    URL = `wh-details.json`;
    stateArr = [];
    counter = 0;
    async getWarehouseStock(cb) {
        await fetch(this.URL, {
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    product: data.product,
                    quantity: data.quantity,
                    expired: data.expired
                })
            })
        return this.state
    }
    async stateToArr() {
        const stateData = await this.getWarehouseStock();
        console.log(stateData)
        for (const property in stateData) {
            this.stateArr.push(property, stateData[property]);
        }
    }

    componentDidMount() {
        this.getWarehouseStock(this.stateToArr)

    }
    componentDidUpdate() {
        
        if (this.counter > 1) return;
        this.stateToArr()
        this.counter++
    }

    render() {

        return (
            <div>              
                    <details style={{position: 'absolute', marginLeft: '50px'}}>
                        <summary>Warehouse available info</summary>
                        {this.stateArr.map((values, i) => {
                            return i % 2 === 0 &&
                                (<small className="text-info" style={{ display: 'block', textAlign: 'left', marginLeft: '9px' }} key={i}>{values}{i===0 &&'s'} </small>)
                        })}
                    </details>
                    <section>
                        <div><Upper>product</Upper>:<p className="text-primary">{this.state.product}</p></div>
                        <div><Upper>quantity</Upper>:<p className="text-success">{this.state.quantity}</p></div>
                        <div><Upper>date</Upper>:<p className="text-info">{new Date(this.state.expired).toUTCString()}</p></div>
                    </section>
            </div>
        )
    }
}

export default WhouseDetails
