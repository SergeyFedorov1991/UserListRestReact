import React from 'react';
import UserService from '../UserService';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Input, Label, FormGroup } from 'reactstrap'
import Axios from 'axios';

const USERS_REST_API_URL = 'http://35.195.34.157:8080/students/';

class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            students:[],
            newUserData: {
                name: '',
                dateOfBirth: '',
                university: ''
            },
            editUserData: {
                id: '',
                name: '',
                dateOfBirth: '',
                university: ''
            },
            newUserModal: false,
            editUserModal: false
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ students: response.data})
        });
    }

    createUser(){
        this.setState({
            newUserModal: !this.state.newUserModal
        })
    }

    addUser(){
        Axios.post(USERS_REST_API_URL, this.state.newUserData).then((response) => {
            this.componentDidMount();
        });
        this.createUser();
    }

    updateUserModal(id, name, dateOfBirth, university){
        this.setState({
            editUserData: {id, name, dateOfBirth, university}, editUserModal: !this.state.editUserModal
        })
    }

    updateUser(){
        
        Axios.put(USERS_REST_API_URL + this.state.editUserData.id, this.state.editUserData).then((response) => {
            this.componentDidMount();
        });
    
        this.setState({
            editUserModal: false, editUserData: {id: '', name: '', dateOfBirth: '', university: ''}
        })
    }

    deleteUser(id){
        Axios.delete(USERS_REST_API_URL + id).then((response) => {
            this.componentDidMount();
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Students List</h1>
                <Button color="primary" onClick={this.createUser.bind(this)} >Add User</Button>  
                <Modal isOpen={this.state.newUserModal} toggle={this.createUser.bind(this)}>
                    <ModalHeader toggle={this.createUser.bind(this)}>Add a new User</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" value={this.state.newUserData.name} onChange={(e) => {
                                let { newUserData } = this.state;
                                newUserData.name = e.target.value;
                                this.setState({ newUserData });
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" value={this.state.newUserData.dateOfBirth} onChange={(e) => {
                                let { newUserData } = this.state;
                                newUserData.dateOfBirth = e.target.value;
                                this.setState({ newUserData });
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="university">University</Label>
                            <Input id="university" value={this.state.newUserData.university}onChange={(e) => {
                                let { newUserData } = this.state;
                                newUserData.university = e.target.value;
                                this.setState({ newUserData });
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
                        <Button color="secondary" onClick={this.createUser.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.editUserModal} toggle={this.createUser.bind(this)}>
                    <ModalHeader toggle={this.createUser.bind(this)}>Update User</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" value={this.state.editUserData.name} onChange={(e) => {
                                let { editUserData } = this.state;
                                editUserData.name = e.target.value;
                                this.setState({ editUserData });
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" value={this.state.editUserData.dateOfBirth} onChange={(e) => {
                                let { editUserData } = this.state;
                                editUserData.dateOfBirth = e.target.value;
                                this.setState({ editUserData });
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="university">University</Label>
                            <Input id="university" value={this.state.editUserData.university}onChange={(e) => {
                                let { editUserData } = this.state;
                                editUserData.university = e.target.value;
                                this.setState({ editUserData });
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>
                        <Button color="secondary" onClick={this.updateUserModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                
                
                <Table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Id</td>
                            <td> User Name</td>
                            <td> Date of birth</td>
                            <td> University</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.students.map(
                                user => 
                                <tr key = {user.id}>
                                     <td> {user.id}</td>   
                                     <td> {user.name}</td>   
                                     <td> {user.dateOfBirth}</td>   
                                     <td> {user.university}</td>  
                                     <td>
                                        <Button color="success" size="sm" className="mr-2" onClick={this.updateUserModal.bind(this, user.id, user.name, user.dateOfBirth, user.university)}>Edit</Button>
                                        <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, user.id)}>Delete</Button>
                                    </td> 
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default UserComponent