import React from "react";

function TableBody({tableContents}) {

    let items2 = tableContents.map(item => {
        let values = Object.values(item);
        let rowBody = [];
        for (let i = 1; i < values.length; i++) {  
            let value = values[i] || "-";
            rowBody.push(<td key={value}>{value}</td>)
        }
        let row = 
            <tr key={values[0]}>
                <th scope="row">{values[0]}</th>
                {rowBody}
            </tr>;
        return row;
    })

    return (
        <tbody>
            {items2}
        </tbody>
    );
}

export default TableBody;
