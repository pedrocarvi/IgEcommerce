import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants.js";
import { createCategory } from "./../../Redux/Actions/CategoryActions.js";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error.js";
import Loading from "../LoadingError/Loading.js";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category, success: successCreate } = categoryCreate;

  useEffect(() => {
    if (category) {
      toast.success("Category created", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
      setDescription("");
      setImage("");
    }
  }, [category, dispatch, successCreate, _]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, description, image));
    forceUpdate();
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="category_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control py-3"
              id="category_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Images</label>
            <input className="form-control" type="file" />
          </div>
          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Type here"
              className="form-control"
              id="category_description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary py-3" onClick={forceUpdate}>
              Create category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
