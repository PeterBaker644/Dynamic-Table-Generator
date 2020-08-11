import React from "react";

function Table(props) {

    let employees = props.employee.map(item =>
        <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.Name}</td>
            <td>{item.Role}</td>
            <td>{item.Department}</td>
            <td>{item.Salary}</td>
            <td>{item.Manager || "-"}</td>
        </tr>
    )

    return (
        <tbody>
            {employees}
        </tbody>
    );
}

export default Table;
