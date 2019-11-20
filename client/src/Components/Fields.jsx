import React, { Component } from 'react';


class Fields extends Component {
    state = { 
        _id: 0,
        name: '',
        age: 0,
        sex: 'M',
        email: ''
     };

     constructor(props) {
         super(props);

     }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = e => {
        this.props.submitted(this.state);  
        
        this.setState({
            _id: 0,
            name: '',
            age: 0,
            sex: 'M',
            email: ''
        });
        
        e.preventDefault();        
    }

    componentWillReceiveProps(thisProps) {        
        if(thisProps.toEditData._id !== 0) {                        
            console.log(thisProps.toEditData[0]);
            this.setState({
                _id: thisProps.toEditData[0]._id,
                name: thisProps.toEditData[0].name,
                age: thisProps.toEditData[0].age,
                sex: thisProps.toEditData[0].sex,                
                email: thisProps.toEditData[0].email
            });
        }        
    }

    clearFields = () => {        
        this.setState({
            _id: 0,
            name: '',
            age: 0,
            sex: 'M',
            email: ''
        });
    }

    render() { 

        const {_id,name,age,sex,email} = this.state;

        return ( 
            <form onSubmit={this.submitHandler}>  
                <div className="container">
                    <div className="row">
                    <div className="col-md-2">
                            <div className="form-group">
                                <label className="d-block">Id</label>
                                <input type="text" className="form-control w-100" name="_id" value={_id} disabled onChange={this.changeHandler}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="d-block">Name</label>
                                <input type="text" className="form-control w-100" name="name" value={name} onChange={this.changeHandler}/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label className="d-block">Age</label>
                                <input type="number" className="form-control w-100" name="age" value={age} onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label className="d-block">Sex</label>
                                <input type="text" className="form-control w-100" name="sex" value={sex} onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="d-block">Email</label>
                                <input type="text" className="form-control w-100" name="email" value={email} onChange={this.changeHandler}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary m-1">Submit</button>
                                <button type="button" className="btn btn-secondary m-1" onClick={this.clearFields}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>            
         );
    }
}
 
export default Fields;