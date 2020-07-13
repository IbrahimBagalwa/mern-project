import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { itemAdd } from '../actions/itemActions';
import PropTypes from 'prop-types';



export class ItemModel extends Component {
  
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
      }

    static propTypes = {
        itemAdd: PropTypes.func.isRequired,
        items: PropTypes.object.isRequired

    };

    state = {
        modal : false,
        name : ""
    };


    toggle = () => {
        this.setState({
            modal : !this.state.modal
        });
    };


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})

    };


    onSubmit = (e) =>{
        e.preventDefault();
        const newitem = {
            name : this.state.name
        }
        this.props.itemAdd(newitem);
        this.toggle();
    }


    render() {
        return (
            <div ref={this.wrapper}>
                {this.props.children}
                <Button 
                color="dark"
                style = {{marginBottom: '2rem'}}
                onClick={this.toggle}
                >AddItem</Button>
                <Modal isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to Shooping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add shopping item"
                                onChange={this.onChange}/>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >Add item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    items : state.items
})

export default connect(mapStateToProps, { itemAdd })(ItemModel);
