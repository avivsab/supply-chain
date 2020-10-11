import React from 'react'

export default function UnexpectedDetails({ ...props }) {
    const { details, Upper } = props;
    details.splice(0, 2); // don't need details about retrieved data (know its duplicate)

    // display number only for product property
    for (let i = 2; i < details.length; i++) {
        let count = 1;
        if (typeof details[i] === 'string' && i % 2 === 0) {
            details[i] = details[i].slice(0, -1);
        }
        if (typeof details[i] === 'string' && details[i].startsWith('product')) {
            count++;
            details[i] += ` ${count}`;
        }
    }
    return (
        <div>
            <details style={{ position: 'absolute', marginLeft: '50px' }}>
                <summary>Warehouse available info</summary>
                {details.map((value, i) => {
                    return i % 2 === 0 &&  //  show only keys
                        (<small className="text-info" style={{ display: 'block', textAlign: 'center', fontSize: '100%' }} key={i}>{value}</small>)
                })}
            </details>
            {details.map((value, i) => {
                return (<div key={i}> {i % 2 === 0 ?
                    <Upper style={{ fontWeight: 'bold', color: 'teal' }}>{value}:</Upper>
                    :
                    <p className="text-primary">{value}</p>
                }
                </div>
                )
            })}
        </div>
    )
}
