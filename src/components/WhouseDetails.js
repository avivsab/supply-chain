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
    activeWarehouse = this.setActiveWH(this.props.activeWarehouse);
    URL = `wh-${this.activeWarehouse}-details.json`;
    stateArr = [];
    counter = 0;
    async getWarehouseStock() {
        this.setActiveWH(this.props.activeWarehouse);
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
            .catch(e => {
                this.setState({error: 'error displaying the data'})
                console.error(`\x1b[36m${e}`)
            })
        return this.state;
    }
    async stateToArr() {
        const stateData = await this.getWarehouseStock();
        console.log(stateData)
        for (const property in stateData) {
            this.stateArr.push(property, stateData[property]);
        }
    }
    setActiveWH(WH) {
        const activate = WH.filter(wh => (wh.active));
        const activeWarehouse = activate[0].name
        return activeWarehouse;
    }
    componentDidMount() {
        this.getWarehouseStock(this.stateToArr);

    }
    componentDidUpdate() {

        if (this.counter > 1) return;
        this.stateToArr();
        this.counter++;
    }

    render() {
        const { product, quantity, expired, error } = this.state;
        return (
            <div>   
                    {error ? <h3 style={{color: 'red'}}>Problem getting Warehouse data</h3>
                    :
                    <>          
                    <details style={{position: 'absolute', marginLeft: '50px'}}>
                        <summary>Warehouse available info</summary>
                        {this.stateArr.map((values, i) => {
                            return i % 2 === 0 && //  show only keys
                                (<small className="text-info" style={{ display: 'block', textAlign: 'center', fontSize: '100%' }} key={i}>{values}{i===0 &&'s'} </small>)
                        })}
                    </details>
                    <section>
                        <div><Upper>product</Upper>:<p className="text-primary">{product}</p></div>
                        <div><Upper>quantity</Upper>:<p className="text-success">{quantity}</p></div>
                        <div><Upper>date</Upper>:<p className="text-info">{new Date(expired).toUTCString()}</p></div>
                    </section>
                    </>
                    }
            </div>
        )
    }
}

export default WhouseDetails
