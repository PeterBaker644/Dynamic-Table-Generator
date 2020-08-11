import React from "react";

function TableItem(props) {

    let manager = props.manager || "-";

    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.role}</td>
            <td>{props.department}</td>
            <td>{props.salary}</td>
            <td>{manager}</td>
        </tr>
    );
}

export default TableItem;
