import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(!showPost);
  };
  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <h2 className="text-center bg-dark text-white p-2">Create Post</h2>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter post title"
          />
        </div>
        <div className="form-floating">
          <textarea
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            className="form-control"
            placeholder="Post description"
            id="floatingTextarea"
            defaultValue={""}
          />
          <label for="floatingTextarea">Description</label>
        </div>
        <div className="mt-4 d-flex align-items-end justify-content-end">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button
            className="btn btn-danger ms-4"
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </div>
  );
};

export default CreatePost;
