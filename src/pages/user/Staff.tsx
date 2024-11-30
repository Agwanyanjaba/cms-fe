import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import "./staff.scss"

const Staff = () => {

  //Fetch data and send to Single Component
  
  return (
    <div className="user">
      <Single {...singleUser}/>
    </div>
  )
}

export default Staff;