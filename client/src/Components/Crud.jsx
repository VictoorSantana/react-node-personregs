import React, { Component } from 'react';
import Grid from './Grid';
import Fields from './Fields';
import axios from 'axios';

const API_URL = 'http://localhost:5000/person';        

class Crud extends Component {
    state = { 
        person: [],                
        personSelected: {
            _id: 0,
            name: '',
            age: 0,
            sex: 'M',
            email: ''
        }
    }

    constructor() {
        super();

        this.loadRecords();
    }

    loadRecords() {                    
        fetch(API_URL)
         .then(res => {      
           return res.json()
         })
         .then(json => {       
           let result = json;    

           if(result == undefined) result = [];           
           this.setState({person: result});           
         });
    }

    handleSubmitted = (person) => {                              
            axios            
            .post(API_URL, person)
            .then(response => {
                if(response.status == 200) { 
                    if(person._id == 0) { //means that is to add
                        this.loadRecords();                                  
                    }                                               
                } 
                alert(response.data.message);            
            }).catch(error => {
                alert(error.message);
            });
    }

    handleEdit = (rowId) => {        
        var result = this.state.person.filter(person => {
            return person._id === rowId
        });
        this.setState({personSelected: result});             
    }

    handleDelete = (rowId) => {        
        const deletePerson = { personId: rowId };        
        axios
        .post(API_URL + 'Delete', deletePerson)
        .then(response => {
            alert(response.data.message);            
        }).catch(error => {
            alert(error.message);
        });        
    }

    render() { 
        return ( 
            <React.Fragment>
                <div className="text-center m-2">
                    <h2>Person Register</h2>
                </div>
                <Grid data={this.state.person} editData={this.handleEdit} delete={this.handleDelete}></Grid>
                <Fields submitted={this.handleSubmitted} toEditData={this.state.personSelected}></Fields>
            </React.Fragment>            
         );
    }
}
 
export default Crud;