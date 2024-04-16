import users from "./api/users.js";
import goals from "./api/goals.js"
import activities from "./api/activities.js";
import stepCounts from "./api/stepCounts.js";

export default function ( server, mongoose ) {

  users( server, mongoose );
  goals( server, mongoose );
  activities( server, mongoose );
  stepCounts( server, mongoose );
}
