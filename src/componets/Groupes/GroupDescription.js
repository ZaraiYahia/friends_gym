import React from "react";

const GroupDescription = ({ Data }) => {
  return (
    <div className="app__allgroupes_content_body-header">
      {Data.map((group) => {
        const {
          group_id,
          group_name,
          nombre_place,
          coach_id,
          first_name,
          last_name,
          mail_address,
          phone,
          designation_cat,
        } = group;
        if (Data === []) return <h1>NO MATCH GROUPS</h1>;
        return (
          <div key={group_id}>
            <div className="app__allgroupes_content-col">
              <h3>Group_ID:{group_id}</h3>
              <h3>Group Name:{group_name}</h3>
              <h3>Group Type:{designation_cat}</h3>
              <h3>Total Member:{nombre_place}</h3>
            </div>
            <div className="app__allgroupes_content-col">
              <h3>Coach Id:{coach_id}</h3>
              <h3>C* First Name:{first_name}</h3>
              <h3>C* Last Name:{last_name}</h3>
              <h3>C* Phone Number:{phone}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupDescription;
