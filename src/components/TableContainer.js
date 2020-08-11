import React, { Component } from "react";
import TableItem from "./TableItem";
import dataJSON from "../seed.json"

class TableContainer extends Component {
    // State variables are VERY case sensitive!
    state = {
        sortBy: "Name",
        sortOrder: "asc",
        filterBy: ""
    };

    // handlePageChange = page => {
    //     this.setState({ sortBy: page });
    // };

    superSorter(key, order = 'asc') {
        // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            // String conversion if necessary
            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    configureList() {
        // Consider splitting "Name" into first and last for easy sorting.
        const employeeArray = (Object.values(dataJSON));
        const employeesFiltered = [];
        for (const item of employeeArray) {
            if (Object.values(item).includes(this.state.filterBy) || !this.state.filterBy) employeesFiltered.push(item);
        }
        const employeesSorted = employeesFiltered.sort(this.superSorter(this.state.sortBy));
        return (employeesSorted);
    }

    // renderItems() {
    //     this.configureList();
    // }

    renderItems() {
        for (const item of this.configureList()) {
            return <TableItem employee={item} />
            // This sucks, I can't return it because it breaks the loop. Needs to be put inside of a Table component that does the whole table. Include below table partial v. Has to pass in the entire list. Maybe try to make the table dynamic to the size of the list... Or not because we need to program buttons, but maybe because I could name the IDs after the keys which would be smarter.... Refer to activity 13. 
        }
    };

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Department</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Manager</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableContainer;
