import invalid from "../../asset/images/404-error.png";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="centered-container text-center">
      <img className="invalid" src={invalid} />
      <p className="error_page">Page not found</p>
      <Link to={"/home"} className="btn btn-outline-danger">
        بازگشت
      </Link>
    </div>
  );
}
export default PageNotFound;
