import React, { Component } from 'react'
import styled from 'styled-components'
import UnexpectedDetails from './UnexpectedDetails'
import Unexpired from './Unexpired';

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
            retrievedData: 'initial'

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
                if(!data.length) {
                    this.setState({
                        product: data.product,
                        quantity: data.quantity,
                        expired: data.expired,
                        retrievedData: 'normal'
                    })
                }
                else {
                    let product, quantity, expierd;
                    const newState = {};
                    for(let i = 0; i < data.length; i++) {
                        product = 'product ' + (i+1);
                        quantity = 'quantity' + (i+1);
                        expierd = 'expierd' + (i+1);
                        newState[product] = data[i].product;
                        newState[quantity] = data[i].quantity;
                        newState[expierd] = data[i].expired;                       
                    }
                    newState.retrievedData = 'unexpected';
                    this.setState(newState);
                }
            })
            .catch(e => {
                this.setState({error: 'error displaying the data'})
                console.error(`\x1b[36m${e}`)
            })
        return this.state;
    }
    async stateToArr() {
        const stateData = await this.getWarehouseStock();
        for (const property in stateData) {
            if(!stateData[property]) continue; // handle unexpected data

        //    handle data missing
                if(stateData[property] !== 'No expiration date') {
                    this.stateArr.push(property, stateData[property]);
                }
        }

        // handle duplicate data
        for(let i = 1; i < this.stateArr.length; i++) {
            if(this.stateArr[i] === this.stateArr[0]) {
                this.stateArr.splice(0 , i)
                break;
            }
            
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
            this.state.retrievedData === 'unexpected' ?
            <UnexpectedDetails details={this.stateArr} Upper={Upper}/>
            :
            <div>   
                    {error ? <h3 style={{color: 'red'}}>Problem getting Warehouse data</h3>
                    :
                    <>          
                    <details style={{position: 'absolute', marginLeft: '50px'}}>
                        <summary>Warehouse available info</summary>
                        {this.stateArr.map((value,i) => {
                           return i % 2 === 0 &&  //  show only keys
                                (<small className="text-info" style={{ display: 'block', textAlign: 'center', fontSize: '100%' }} key={i}>{value}{i===0 &&'s'} </small>)
                        })}
                    </details>
                    <section>
                        <div><Upper>product</Upper>:<p className="text-primary">{product}</p></div>
                        <div><Upper>quantity</Upper>:<p className="text-success">{quantity}</p></div>
                        {expired==='No expiration date'?
                        <div><Upper>date</Upper>:<p className="text-info">{expired}</p></div>
                        :
                        new Date(expired).toUTCString() === 'Invalid Date'?
                        <Unexpired Upper={Upper}/>
                        :
                        <div><Upper>date</Upper>:<p className="text-info">{new Date(expired).toUTCString()}</p></div>
                    }
                    </section>
                    </>
                    }
            </div>
        )
    }
}

export default WhouseDetails
