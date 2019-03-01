import React, { useState } from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Icon } from "@quinscape/automaton-js"
import { DEFAULT_OPTIONS, UserFormControl } from "domainql-form"
import FooForm from "./FooForm";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const CRUDDetail = props => {

    const [ control, setControl] = useState(DEFAULT_OPTIONS);
    const [ modalOpen, setModalOpen] = useState(false);

    const changeControl = (k, v) => setControl({
        ...control,
        [k]: v
    });

    const close = () => setModalOpen(false);

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

            <div className="row">
                <div className="col">
                    <button className="btn btn-light float-right" title="Form Settings" onClick={ () => setModalOpen(true) }>
                        <Icon className="fa-cog"/>
                    </button>
                </div>
            </div>

            <div className="row">

                <div className="col">
                    <FooForm value={scope.currentFoo} options={ control } />
                </div>
            </div>

            <Modal isOpen={ modalOpen } toggle={ close } >
                <ModalHeader toggle={ close }>
                    User Form Control
                </ModalHeader>
                <ModalBody>
                    <UserFormControl
                        control={control}
                        changeControl={changeControl}
                    />
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={ () => setModalOpen(false) }>
                        Close
                    </button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    )
};

export default fnObserver(CRUDDetail)
