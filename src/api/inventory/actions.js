import axios from 'axios';

import { SAVE_RECORD_REQUEST, SAVE_RECORD_SUCCESS, SAVE_RECORD_FAIL, EDIT_RECORD_SUCCESS, EDIT_RECORD_FAIL } from './actionTypes';

export const saveRecordRequest = (data) => ({
    type: SAVE_RECORD_REQUEST,
    payload: data
});

export const saveRecordSuccess = (data) => ({
    type: SAVE_RECORD_SUCCESS,
    payload: data,
})

export const saveRecordFail = (error) => ({
    type: SAVE_RECORD_FAIL,
    payload: error
})

export const saveRecord = (data) => {
    return (dispatch) => {
        // dispatch(saveRecordRequest());
        axios.post('http://localhost:8080/consolidatedInventory/saveRecord', data)
        .then((response) => {
            const data = response.data;
            dispatch(saveRecordSuccess(data));
        })
        .catch((error) => {
            dispatch(saveRecordFail(error.message));
        })
    }
}

export const editRecordSuccess = (data) => ({
    type: EDIT_RECORD_SUCCESS,
    payload: data,
})

export const editRecordFail = (error) => ({
    type: EDIT_RECORD_FAIL,
    payload: error
})

export const editRecordRequest = (data) => {
    return (dispatch) => {
        axios.patch('http://localhost:8080/consolidatedInventory/updateRecord', data)
        .then((response) => {
            const data = response.data;
            dispatch(editRecordSuccess(data));
        })
        .catch((error) => {
            dispatch(editRecordFail(error.message));
        })
    }
}

export const deleteRecordSuccess = (data) => ({
    type: EDIT_RECORD_SUCCESS,
    payload: data,
})

export const deleteRecordFail = (error) => ({
    type: EDIT_RECORD_FAIL,
    payload: error
})

export const deleteRecordRequest = (propertyNo) => {
    return (dispatch) => {
        axios.delete(`http://localhost:8080/consolidatedInventory/deleteRecord/${propertyNo}`)
        .then((response) => {
            const data = response.data;
            dispatch(deleteRecordSuccess(data));
        })
        .catch((error) => {
            dispatch(deleteRecordFail(error.message));
        })
    }
}

export const login = async (username, password) => {
    const response = await axios.post(`http://localhost:8080/user/login`, username, password );
    return response.data;
};