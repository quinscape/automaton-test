import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { UserFormControl, Icon } from "domainql-form";

const FormOptions = props => {

    const { control, changeControl } = props;

    const [ modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <button className="btn btn-light float-right" title="Form Settings" onClick={ () => setModalOpen(true) }>
                        <Icon className="fa-cog"/>
                    </button>
                </div>
            </div>
            <Modal isOpen={ modalOpen } toggle={ close } >
                <ModalHeader toggle={ close }>
                    User Form Control
                </ModalHeader>
                <ModalBody>
                    <UserFormControl
                        control={ control }
                        changeControl={ changeControl }
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

export default FormOptions;
