import React, {useContext} from "react";
import {Context} from "../../index";
import locales from "../../constants/locales";
import {Form} from "react-bootstrap";

export default function LocalePicker() {
    const {localization} = useContext(Context)

    const onLocaleChanged = (e) => {
        localization.setLocalization(e.target.value);
    }

    return (
            <Form.Select
                style={{width:'130px'}}
                onChange={onLocaleChanged}
                defaultValue={localization.localization}
            >
                <option value={locales.EN} >English</option>
                <option value={locales.RU} >Русский</option>
                <option value={locales.BY} >Беларускі</option>
            </Form.Select>
    )
}