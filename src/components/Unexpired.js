import React from 'react'
import UnExpiredSvgIcon from './UnExpiredSvgIcon'
export default function Unexpired(props) {

    const { Upper } = props;
    return (
        <div>
            <div><Upper>date:</Upper><p className="font-weight-bold text-info">There is no expiration date</p>
                <UnExpiredSvgIcon />
            </div>
        </div>
    )
}
