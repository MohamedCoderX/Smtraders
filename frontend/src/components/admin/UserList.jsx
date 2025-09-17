import { Fragment, useEffect } from "react"

import {  useSelector } from "react-redux"


import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';

import Sidebar from "./Sidebar"

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted }  = useSelector(state => state.userState)



    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                
                {
                    label:"Phone",
                    field:"Phone",
                    sort:"asc"
                },
                {
                    label: 'Address',
                    field: 'Address',
                    sort: 'asc'
                },
                
            ],
            rows : []
        }

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
             
                Phone:user.phone,
                Address:user.address,
            })
        })

        return data;
    }


    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">User List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setUsers()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}