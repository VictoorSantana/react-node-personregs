import React, { Component } from 'react';

class Grid extends Component {
    state = { 
        gridData: this.props.data
     }

    constructor(props) {
        super(props);        
    }


    getGridData() {        
        let result = this.props.data.map((person) =>
                        <tr key={person._id}>
                            <td>
                                <button type="button" className="btn btn-info m-1 btn-sm" onClick={() => this.props.editData(person._id)}>Edit</button>
                                <button type="button" className="btn btn-danger m-1 btn-sm" onClick={() => this.props.delete(person._id)}>Del</button>
                            </td>
                            <td>
                                {person._id}
                            </td>
                            <td>
                                {person.name}
                            </td>
                            <td>
                                {person.age}
                            </td>
                            <td>
                                {person.sex}
                            </td>
                            <td>
                                {person.email}
                            </td>
                        </tr>
                    );

        return result;                            
    }

    render() { 
        return ( 

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Sex</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>{this.getGridData()}</tbody>
                </table>
            </div>            
         );
    }
}
 
export default Grid;