import React from "react";

function TableHeaderButton(props) {

    return (
        <th scope="col">
            <button
                type="button"
                className="btn btn-sm filter-button"
                onClick={() => props.sortButton(props.name)}
            >
                <span className="table-header">{props.name}</span>
                {props.children}
            </button>
        </th>
    );
}

export default TableHeaderButton;
