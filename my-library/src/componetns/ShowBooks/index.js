import { connect } from "react-redux";
import { setMainState } from "../../store/actions";
import { showBooks } from "./showBooks";

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({ 
    setMainState: (type, payload) => dispatch(setMainState(type, payload)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(showBooks)