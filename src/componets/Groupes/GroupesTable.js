import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "../Groupes/Groupes.css";
const GroupesTable = ({ Data, onSelect, onDelete }) => {
  return (
    <div className="app__allgroupes_container-table">
      <div className="app__allgroupes_contient_body-table">
        <table className="app__allgroupes_contient_body--table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Number Of Places</th>
              <th>Coach FirstName</th>
              <th>Coach LastName</th>
              <th>Coach Number</th>
              <th>Coach Email</th>
              <th>Group categorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((group) => {
              const {
                group_id,
                group_name,
                nombre_place,
                first_name,
                last_name,
                mail_address,
                phone,
                designation_cat,
              } = group;
              return (
                <tr key={group_id}>
                  <td>{group_name}</td>
                  <td>{nombre_place}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{phone}</td>
                  <td>{mail_address}</td>
                  <td>{designation_cat}</td>
                  <td>
                    <span id="action-btn">
                      <AiFillDelete
                        onClick={() =>
                          onDelete({
                            id: group.group_id,
                          })
                        }
                      />
                    </span>
                    <span id="action-btn">
                      <AiFillEdit
                        onClick={() =>
                          onSelect({
                            idgroup: group.group_id,
                            groupname: group.group_name,
                            totalmembre: group.nombre_place,
                            groupcoach: group.coach_id,
                            typeofgroup: group.group_cat_id,
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

export default GroupesTable;
