import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const AllMembreTabel = ({ Data, onSelect, onDelete }) => {
  return (
    <div className="app__allmembre_container-table">
      <div className="app__allmembre_content-table">
        <table className="app__allmembre_content--table">
          <thead>
            <tr>
              <th>Membre_Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>gender</th>
              <th>Birthdate</th>
              <th>Phone Numbre</th>
              <th>Address</th>
              <th>Mail Address</th>
              <th>Inscription Date</th>
              <th>Subscription Date</th>
              <th>Cancel Date</th>
              <th>Traning type</th>
              <th>Programme Name</th>
              <th>Diet Name</th>
              <th>Group Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((user) => {
              const {
                adherent_id,
                first_name,
                last_name,
                birth_date,
                gender,
                mail_address,
                address,
                inscription_date,
                group_name,
                diet_name,
                phone,
                progrem_name,
                subscription_date,
                training_type,
                cancel_date,
              } = user;
              return (
                <tr key={adherent_id}>
                  <td>{adherent_id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{gender}</td>
                  <td>{birth_date}</td>
                  <td>{phone}</td>
                  <td>{address}</td>
                  <td>{mail_address}</td>
                  <td>{inscription_date}</td>
                  <td>{subscription_date}</td>
                  <td>{cancel_date}</td>
                  <td>{training_type}</td>
                  <td>{progrem_name}</td>
                  <td>{diet_name}</td>
                  <td>{group_name}</td>
                  <td>
                    <span id="action-btn">
                      <AiFillDelete
                        onClick={() => onDelete({ id: user.adherent_id })}
                      />
                    </span>
                    <span id="action-btn">
                      <AiFillEdit
                        onClick={() =>
                          onSelect({
                            id: user.adherent_id,
                            firstname: user.first_name,
                            lastname: user.last_name,
                            birthdate: user.birth_date,
                            gender: user.gender,
                            emailaddress: user.mail_address,
                            password: "",
                            address: user.address,
                            username: "",
                            subscription: user.subscription_date,
                            cancel: user.cancel_date,
                            typeOfTraining: user.training_type,
                            groupSession: user.group_id,
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

export default AllMembreTabel;
