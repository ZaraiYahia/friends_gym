import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const EmployeeTable = ({ Data, onChange, onSelect, onDelete }) => {
  return (
    <div className="app__allemployee_container-table">
      <div className="app__allemployee_contient-table">
        <table className="app__allemployee_content--table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>gender</th>
              <th>Birthdate</th>
              <th>Phone Numbre</th>
              <th>Address</th>
              <th>Mail Address</th>
              <th>Start Date</th>
              <th>contrat duration</th>
              <th>Employee specialite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((user, index) => {
              const {
                first_name,
                last_name,
                birth_date,
                gender,
                mail_address,
                address,
                phone,
                start_date,
                contract_duration,
                designation,
              } = user;
              return (
                <tr key={index}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{gender}</td>
                  <td>{birth_date}</td>
                  <td>{phone}</td>
                  <td>{address}</td>
                  <td>{mail_address}</td>
                  <td>{start_date}</td>
                  <td>{contract_duration}</td>
                  <td>{designation}</td>
                  <td>
                    <span id="action-btn">
                      <AiFillDelete
                        onClick={() => {
                          onDelete({
                            id: user.employee_id,
                            role: user.designation,
                          });
                         
                        }}
                      />
                    </span>
                    <span id="action-btn">
                      <AiFillEdit
                        onClick={() =>
                          onSelect({
                            id: user.employee_id,
                            firstname: user.first_name,
                            lastname: user.last_name,
                            birthdate: user.birth_date,
                            gender: user.gender,
                            emailaddress: user.mail_address,
                            password: "",
                            address: user.address,
                            username: user.user_name,
                            startdate: user.start_date,
                            contractduration: "",
                            typeofcoaching: user.specialite_id,
                            salary: user.salary,
                          })
                        }
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
