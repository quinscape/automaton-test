import { observer as fnObserver } from "mobx-react-lite";
import { FieldMode, FormBlock } from "domainql-form";
import React, { useState } from "react";


const FieldModeControl = fnObserver(({children}) => {

    const [mode, setMode] = useState(FieldMode.NORMAL);

    return (
        <FormBlock
            className="field-mode-control p-3 mb-3"
            options={{
                mode
            }}
        >
            <div
                onChangeCapture={ ev => setMode(ev.target.value) }
            >

                <div
                    className="form-check form-check-inline ml-3 pl-1 border-left"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="formMode"
                        id="radioFormMode1"
                        defaultValue={FieldMode.PLAIN_TEXT}
                        defaultChecked={mode === FieldMode.PLAIN_TEXT}
                    />
                    <label className="form-check-label" htmlFor="radioFormMode1">
                        PLAIN_TEXT
                    </label>
                </div>
                <div
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="formMode"
                        id="radioFormMode2"
                        defaultValue={FieldMode.READ_ONLY}
                        defaultChecked={mode === FieldMode.READ_ONLY}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="radioFormMode2"
                    >
                        READ_ONLY
                    </label>
                </div>
                <div
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="formMode"
                        id="radioFormMode3"
                        defaultValue={FieldMode.NORMAL}
                        defaultChecked={mode === FieldMode.NORMAL}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="radioFormMode3"
                    >
                        NORMAL
                    </label>
                </div>
            </div>
            {
                children
            }
        </FormBlock>
    );
})

export default FieldModeControl
