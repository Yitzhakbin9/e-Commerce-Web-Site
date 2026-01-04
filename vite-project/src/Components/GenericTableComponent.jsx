import React from 'react'

const GenericTableComponent = (props) => {

    const headers = props.headers
    const tableRow = props.tableRow
debugger
    return (
            <table className="table">

                <thead>
                    <tr>
                        {headers.map(h => (
                            <th key={h.key}>{h.label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* {tableRow.map((row, index) => (
                        <tr key={index}>
                            {headers.map(h => (
                                <td key={h.key}>{row[h.key]}</td>
                            ))}
                        </tr>
                    ))} */}
                </tbody>
            </table>
    )
}

export default GenericTableComponent