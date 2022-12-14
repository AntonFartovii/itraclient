import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {editCollection} from "../../http/collectionAPI";
import {Context} from "../../index";
import CollectionForm from "../forms/CollectionForm";

const EditCollection = ({show, onHide, id, form, setForm}) => {

    const click = () => {

        editCollection( form ).then( data => {
            onHide()
        })
    }
    form.prevImg = form.img
    console.log(form)
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <CollectionForm form={form} setForm={setForm}/>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Close
                </Button>
                <Button
                    variant="outline-success"
                    onClick={click}
                >
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCollection;