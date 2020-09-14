import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div>
      <h3 class="text-dark" style={{ textTransform: "capitalize" }}>
        {school}
      </h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>

      <p style={{ textTransform: "capitalize" }}>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p style={{ textTransform: "capitalize" }}>
        <strong>Field of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
