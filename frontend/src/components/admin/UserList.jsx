import { Fragment } from "react"

import {  useSelector } from "react-redux"



import { MDBDataTable} from 'mdbreact';

import Sidebar from "./Sidebar"

export default function UserList() {
    const { users = []}  = useSelector(state => state.userState)



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

        users.forEach( (user,index )=> {
            data.rows.push({
                id: index+1,
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
                
                    <MDBDataTable
                        data={setUsers()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
          
            </Fragment>
        </div>
    </div>
    )
}